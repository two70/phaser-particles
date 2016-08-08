function Universe () {
	this.particles = game.add.group();
	this.fields = game.add group();
	this.emitters = game.add.group();
}

Universe.prototype.addEmitter = function(point, emitVelocity, spread, key) {
	var emitter = new Emitter(point, emitVelocity, spread, key);
	this.emitters.add(emitter);
};

Universe.prototype.addField = function(point, mass, key) {
	var field = new Field(point, mass, key);
	this.fields.add(field);
};