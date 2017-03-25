'use strict'

class PriorityQueue {

	constructor() {
		this.nodes = [];	
	}

	enqueue(value, key, priority) {
		this.nodes.push({key: key, value: value, priority: priority });
    	this.sort();
	}

	dequeue() {
		return this.nodes.shift().value;
	}

	sort() {
		this.nodes.sort(function (a, b) {
      		return a.priority - b.priority;
    	});
	}

	search(key) {
		let node;
		for(let i = 0; i < this.nodes.length; i++) {

			if(this.nodes[i].key === key) {
				node = this.nodes[i];
				break;
			}
		}
		return node;
	}

	update(key, priority) {
		
		let node;
		for(let i = 0; i < this.nodes.length; i++) {

			if(this.nodes[i].key === key) {
				node = this.nodes[i];
				break;
			}
		}

		if(node) {
			node.priority = priority;
			this.sort();
		}
	}

	isEmpty() {
		return !this.nodes.length;
	}
}
module.exports = PriorityQueue;