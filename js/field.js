Field = function(key, point, mass) {
	Phaser.Sprite.call(this, game, point.x, point.y, key);
	this.position = point;
	this.mass = mass || 100;
	this.minMass = this.mass;
	this.maxMass = this.mass * 5;
	this.velocity = Vector(0,0);
	this.acceleration = Vector(0,0);
};

Field.prototype = Object.create(Phaser.Sprite.prototype);
Field.prototype.constructor = Field;

Field.prototype.setMass = function(mass) {
	this.mass = mass;
};

Field.prototype.move = function(acceleration) {
	this.acceleration = acceleration;
	this.velocity.add(acceleration)
};

Field.prototype.update = function() {
	if (this.mass > this.minMass)
		this.mass -= 10;
};