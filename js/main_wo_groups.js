var game = new Phaser.Game(800, 600, Phaser.AUTO, 'container', { preload: preload, create: create, update: update, render: render });

var maxParticles = 2,//000,
  particleSize = 1,
  emissionRate = 20,
  objectSize = 3; // drawSize of emitter/field

var particles = []; 

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters = [];

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that repels with a force of `140`
var fields = [];


function preload() {

}

function create() {
  emitters = [new Emitter(new Vector(150, 150), Vector.fromAngle(6, 2), Math.PI)];

  fields = [new Field(new Vector(250, 150), 90)];

}

function update() {


  addNewParticles();
  plotParticles(game.world.width, game.world.height);
}   

function render() {
  var graphics = game.add.graphics(0,0);

  for  (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    graphics.beginFill(0x0000ff, 1);
    graphics.drawCircle(position.x, position.y, particleSize);
  }
}

function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length > maxParticles) return;

  // for each emitter
  for (var i = 0; i < emitters.length; i++) {

    // emit [emissionRate] particles and store them in our particles array
    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    }

  }
}

function plotParticles(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;

    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;

    // Update velocities and accelerations to account for the fields
    particle.submitToFields(fields);

    // Move our particles
    particle.move();

    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }

  // Update our global particles reference
  particles = currentParticles;
}