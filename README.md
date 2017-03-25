# A* Search

Implementation of the a* path finding algorithm.

### Astar
the constructor for Astar takes the matrix we wish to traverse as well as an optional argument indicating whether we want to include diagonal paths.

### shortestPath 
this function takes two arguments, the starting x and y and the desired destination x and y. The shortest path is returned in the form of a matrix.

### Example Usage

```js
let astar = new Astar([
        [1,1,1,1],
        [0,1,1,0],
        [0,0,1,1]
        ], 
        true);

let path = astar.shortestPath({x:0,y:0}, {x:3,y:2});
// which returns
// path = [ { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 } ]


```

## Testing

``
npm test
``



