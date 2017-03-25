'use strict'

class Node {

	constructor(x, y, parent, g) {
		this.x = x;
		this.y = y;
		this.parent = parent;
		this.g = g || 0;
		this.h = 0;
		this.f = 0;
	}
}

module.exports = Node;