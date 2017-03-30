FROM debian:jessie

ARG NODE_MAJOR_VERSION=6

ENV USERVAR=scottjustin5000
ENV HOME=/home/$USERVAR
ENV APP_FOLDER=astar

RUN apt-get update && \
    apt-get install -y git ssh-client curl adduser build-essential && \

    # adding user which is used for volumes
    useradd --user-group --create-home --shell /bin/false $USERVAR && \

    # Installing node
    curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VERSION}.x | bash - && \
    apt-get install -y nodejs && \

    echo "export LC_ALL=en_US.UTF-8" >> $HOME/.bashrc && \
    echo "export LANG=en_US.UTF-8" >> $HOME/.bashrc && \
    echo "export LANGUAGE=en_US.UTF-8" >> $HOME/.bashrc && \

    npm install -g n && \
    n 6.10.0 && \
    npm install -g npm@3.10.10 && \
    npm install -g pm2 && \

    # reduce bloat
    apt-get purge -y adduser && \
    
    # when removing adduser it removes ssh-client o_O
    apt-get install -y ssh-client && \

    #apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* 


# copy over package.json so we can run npm install on the container
COPY package.json $HOME/$APP_FOLDER/

USER root
RUN chown -R $USERVAR:$USERVAR $HOME && \
    chown -R $USERVAR:$USERVAR $HOME/* && \
    chown -R $USERVAR:$USERVAR $HOME/.npm

# run app as sportradar, set working dir, run install
USER $USERVAR
WORKDIR $HOME/$APP_FOLDER
RUN npm install

# in production source files will be missing, so copy over all code in prod mode
ADD . $HOME/$APP_FOLDER

# start command
USER $USERVAR
