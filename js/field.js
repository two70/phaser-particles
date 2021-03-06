Field = function(point, mass, key) {
	Phaser.Sprite.call(this, game, point.x, point.y, key);
	this.position = new Vector(point.x, point.y);
	this.mass = mass || 100;
	this.anchor.setTo(0.5,0.5);
	this.scale.set(this.mass * 0.01);
	//this.velocity = Vector(0,0);
	//this.acceleration = Vector(0,0);
};

Field.prototype = Object.create(Phaser.Sprite.prototype);
Field.prototype.constructor = Field;

Field.prototype.setMass = function(mass) {
	this.mass = mass;
};

Field.prototype.move = function(acceleration) {
	//this.acceleration = acceleration;
	//this.velocity.add(acceleration)
};

Field.prototype.update = function() {
	this.scale.set(this.mass * 0.01);
};