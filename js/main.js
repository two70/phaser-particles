
var game = new Phaser.Game(1200, 900, Phaser.AUTO, 'container', { preload: preload, create: create, update: update, render: render });

//var particles; 

var playerLoc = new Vector(150, 150);
// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters = [];

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that repels with a force of `140`
var fields = [];

var moving = false;


function preload() {
  game.load.image('particle', 'img/particle.png');
}

function create() {

  emitters = [new Emitter(playerLoc, Vector.fromAngle(4, 4), Math.PI)];
  game.input.holdRate = 500;
  game.input.onDown.add(onTap, this);
  console.log(rgbToHex(0,0,255));

}

function update() {

  if (game.input.activePointer.isDown) {
    var pointerX = game.input.activePointer.x;
    var pointerY = game.input.activePointer.y;
    
    if (pointerX > emitters[0].position.x) {
      if(pointerY > emitters[0].position.y)
        emitters[0].move(new Vector(1, 1));
      else
        emitters[0].move(new Vector(1, -1));
    }
    else {
      if(pointerY > emitters[0].position.y)
        emitters[0].move(new Vector(-1, 1));
      else
        emitters[0].move(new Vector(-1, -1));
    }
  }

  emitters[0].update();
}

function render() {
  var particle = emitters[0].particles.getAt(0);
  var velX = Math.floor(particle.velocity.x);
  var velY = Math.floor(particle.velocity.y);
  var aclX = Math.floor(particle.acceleration.x);
  var aclY = Math.floor(particle.acceleration.y);
  var tint = Math.floor(particle.tint);
  game.debug.text('Living: ' + emitters[0].particles.length + ' Mass: ' + tint, 32, 32);
}

function onTap(pointer, doubleTap) {
  if (doubleTap) {

  }

  else {
    if (pointer.x > emitters[0].position.x) {
      emitters[0].move(new Vector(1, 0));
      /*if (moving)
        moving = false;
      else
        moving = true;*/
    }
    console.log(emitters[0].position.x);
  }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}