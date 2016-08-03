function Universe () {
	this.particles = game.add.group();
	this.fields = game.add group();
	this.emitters = game.add.group();
}

Universe.prototype.addEmitter = function(point, velocity, spread) {
	var emitter = new Emitter(point.velocity, spread);
	this.emitters.add(emitter);
};