
var game = new Phaser.Game(1200, 900, Phaser.AUTO, 'container', { preload: preload, create: create, update: update, render: render });

//var particles; 

var playerLoc = new Vector(300, 250);
var player;
// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
var emitters;// = game.add.group();

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that repels with a force of `140`
var fields = [];

var moving = false;


function preload() {
  game.load.image('particle', 'img/particle.png');
}

function create() {
	emitters = game.add.group();
	player = new Emitter('particle', playerLoc, Vector.fromAngle(2.3, 2.3), Math.PI);
	player.anchor.setTo(0.5, 0.5);
	player.scale.set(0.2);
	emitters.add(player);

}

function update() {

	if (game.input.activePointer.isDown) {
		getMovement();

	}

	//emitters.getAt.update();
}

function render() {
	if (emitters.getAt(0).particles.getAt(500).x) {
		var particle = emitters.getAt(0).particles.getAt(500);
		var velX = Math.floor(particle.velocity.x);
		var velY = Math.floor(particle.velocity.y);
		var aclX = Math.floor(particle.acceleration.x);
		var aclY = Math.floor(particle.acceleration.y);
		var tint = Math.floor(particle.tint);
		var distance = particle.totalDistance;
		game.debug.text('Living: ' + emitters.getAt(0).particles.length, 32, 32);
	}
}

function getMovement() {
	var pointerX = game.input.activePointer.x;
	var pointerY = game.input.activePointer.y;
	var playerX = emitters.getAt(0).position.x;
	var playerY = emitters.getAt(0).position.y;

	if (pointerX > playerX) {
		if (pointerY > playerY)
			var moveAmount = new Vector(1, 1);
		else
	    	var moveAmount = new Vector(1, -1);
	}
	else {
		if (pointerY > playerY)
	    	var moveAmount = new Vector(-1, 1);
		else
	    	var moveAmount = new Vector(-1, -1);
	}
	emitters.getAt(0).move(moveAmount);
}