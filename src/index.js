'use strict'

let Node = require('./star-node.js');
let Queue = require('./priority-queue');

class AStar {
	/* graph is 2d array
	   where 1 = open, 0 = closed
	[
		[1,1,1,1],
		[0,1,1,0],
		[0,0,1,1]
	]
	
	*/
	constructor(graph, diagonal) {
		this.graph = graph;
		this.applyDiagonal = diagonal;
	}

	heuristic(start, destination) {

		let d1 = Math.abs(destination.x - start.x);
		let d2 = Math.abs(destination.y - start.y);

		//if diagonal use diagonal distance
		if(this.applyDiagonal) {
			let D = 1;
			let D2 = Math.sqrt(2);
			return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
		}
		//otherwsie apply simple manhatten/nearest block
		return d1 + d2;
	}

	getPath(node) {

		let current = node;
		let path = [];

		while(current.parent) {
			path.push({x:current.x, y: current.y});
			current = current.parent;
		}
		return path.reverse();
	}

	//get valid neighbors (cooridnates in grid that are not barriers/obstacles)
	getNeighbors(node) {

		let available = [];

		let x = node.x;
		let y = node.y;
		let grid = this.graph;
		// left 
		// if we do not encounter a barrier (0)
		if (grid[y] && grid[y][x-1]) {

			let neighbor = new Node(x - 1, y, node, node.g + 1);
			available.push(neighbor);
		}

		// right
		// if we do not encounter a barrier (0)
		if (grid[y] && grid[y][x + 1]) {

			let neighbor = new Node(x + 1, y, node, node.g + 1);
			available.push(neighbor);
		}

		// down
		// if we do not encounter a barrier (0)
		if (grid[y + 1] && grid[y + 1][x]) {

			let neighbor = new Node(x, y + 1, node, node.g + 1);
			available.push(neighbor);
		}

		// up
		// if we do not encounter a barrier (0)
		if (grid[y - 1] && grid[y - 1][x]) {

			let neighbor = new Node(x, y - 1, node, node.g + 1);
			available.push(neighbor);
		}

		if(this.applyDiagonal) {

			let diagonalCost = 1.414; //(pythagoras)
			//down to left
			if (grid[y + 1] && grid[y + 1][x - 1]) {
				
				let neighbor = new Node(x - 2, y+1, node, node.g + diagonalCost);
			  	available.push(neighbor);
			}

			// down to right
			if (grid[y + 1] && grid[y + 1][x + 1]) {

				let neighbor = new Node(x + 1, y + 1, node, node.g + diagonalCost);
			  	available.push(neighbor);
			}

			// up to left
			if (grid[y + 1] && grid[y + 1][x - 1]) {

				let neighbor = new Node(x - 1, y + 1, node, node.g + diagonalCost);
			  	available.push(neighbor);
			}
			// up to right
			if (grid[y - 1] && grid[y - 1][x + 1]) {

				let neighbor = new Node(x + 1, y - 1, node, node.g + diagonalCost);
			  	available.push(neighbor);
			}
		}
		return available;
	}

	shortestPath(start, destination) {

		let open = new Queue();

		//hash of closed nodes.  once a node has been closed, we will not revisit
		let closed = {};

		//create a node from our start coordinates
		let startNode = new Node(start.x, start.y);
		startNode.h = this.heuristic(start, destination);
		startNode.f = startNode.g + startNode.h;
		//add our start node to the open queue
		open.enqueue(startNode, startNode.x +'_'+ startNode.y, startNode.g);
		//loop while open queue has nodes to process
		while(!open.isEmpty()) {

			let current = open.dequeue();

			//if we've reached our destination, return our path of x, y cooridinates
			if(current.x === destination.x && current.y === destination.y) {
				return this.getPath(current);
			}
			//add the current node to our closed lsit
			closed[current.x+'_'+current.y] = current.f;

			//get a collection of potential next steps (a valid path, i.e. in our grid and a valid path--not a barier)
			let neighbors = this.getNeighbors(current);
			
			neighbors.forEach(neighbor => {
				
				let neighborKey = neighbor.x +'_'+ neighbor.y;
				//if the neighbor is in the closed hash, we return...there is nothing to be done with a closed node
				if(closed[neighborKey]) {
					return;
				}
				//calculate heuristic and node "score"
				neighbor.h = this.heuristic(neighbor, destination);
				neighbor.f = neighbor.g + neighbor.h;

				let openNeighbor = open.search(neighborKey);

				//if the current neighbor node is not in the open queue, add it
				if(!openNeighbor) {

					open.enqueue(neighbor, neighborKey, neighbor.g);
				
				} else if(openNeighbor && neighbor.g < openNeighbor.g) { //otherwise if we have a valid neighbor and the update score is better (lower), update it.
					//update with the better score (and new parent)
					openNeighbor.g = neighbor.g;
					openNeighbor.parent = neighbor.parent;
					open.update(neighborKey, openNeighbor.g);
				}

			});

		}

	}
}

module.exports = AStar;
