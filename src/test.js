'use strict'

let Astar = require('./index');

describe('Test A*', function() {

	it('should find shortest path, two steps across', function(done) {

		let astar = new Astar([[1, 1, 1]], false);

		let path = astar.shortestPath({x:0,y:0}, {x:2,y:0});

		path.should.be.an.instanceOf(Array);
		path.should.have.property('length', 2);
		path[0].x.should.equal(1);
		path[0].y.should.equal(0);
		path[1].x.should.equal(2);
		path[1].y.should.equal(0);
		
		done();
	});

	it('should find shortest path, two steps down', function(done) {

		let astar = new Astar([[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]], false);

		let path = astar.shortestPath({x:0,y:0}, {x:0,y:2});

		path.should.be.an.instanceOf(Array);
		path.should.have.property('length', 2);
		path[0].x.should.equal(0);
		path[0].y.should.equal(1);
		path[1].x.should.equal(0);
		path[1].y.should.equal(2);
		
		
		done();
	});

	it('should find shortest path (no diagonal)', function(done) {

		let astar = new Astar([
				[1,1,1,1],
	  			[0,1,1,0],
	  			[0,0,1,1]
	  			], 
	  			false);

		let path = astar.shortestPath({x:0,y:0}, {x:3,y:2});

		path.should.be.an.instanceOf(Array);
		path.should.have.property('length', 5);
		path[0].x.should.equal(1);
		path[0].y.should.equal(0);
		path[1].x.should.equal(2);
		path[1].y.should.equal(0);
		path[2].x.should.equal(2);
		path[2].y.should.equal(1);
		path[3].x.should.equal(2);
		path[3].y.should.equal(2);
		path[4].x.should.equal(3);
		path[4].y.should.equal(2);
		
		done();
	});

	it('should find shortest path (diagonal)', function(done) {

		let astar = new Astar([
				[1,1,1,1],
	  			[0,1,1,0],
	  			[0,0,1,1]
	  			], 
	  			true);

		let path = astar.shortestPath({x:0,y:0}, {x:3,y:2});

		path.should.be.an.instanceOf(Array);
		path.should.have.property('length', 3);
		path[0].x.should.equal(1);
		path[0].y.should.equal(0);
		path[1].x.should.equal(2);
		path[1].y.should.equal(1);
		path[2].x.should.equal(3);
		path[2].y.should.equal(2);
		
		done();
	});

});






