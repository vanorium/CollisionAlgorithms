# Collision Algorithms
An implementation of a bunch of collision methods written in JavaScript.
- Polygon-Polygon collision based on SAT
  - It also **works with concave polygons** because of triangulation. Triangulation method: [earcut](https://github.com/mapbox/earcut)
- Circle-Polygon collision
- Circle-Circle collision
- AABB check to improve perfomance

### Requirements
- [Node.js](https://nodejs.org/)

### Installation
`git clone https://github.com/vanorium/CollisionAlgorithms`

`cd CollisionAlgorithms`

`npm install` 

### Preview
`npm run dev`

### Demo
Use arrow keys to move

Use A/D to rotate