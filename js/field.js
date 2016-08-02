function Field(point, mass) {
	this.position = point;
	this.mass = mass || 100;
	this.minMass = this.mass;
	this.maxMass = this.mass * 3;
}

Field.prototype.setMass = function(mass) {
	this.mass = mass;
};

Field.prototype.move = function(point) {
	this.position = point;
	this.mass = this.maxMass;
};

Field.prototype.update = function() {
	if (this.mass > this.minMass)
		this.mass -= 5;
};