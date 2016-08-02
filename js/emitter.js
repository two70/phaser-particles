function Emitter(point, velocity, spread) {
  this.position = point; // Vector
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.drawColor = "#999"; // So we can tell them apart from Fields later
  this.particles = game.add.group();
  this.isFieldMoving = false;

  // Total amount of particles is the time to live(ttl) times the emissionRate
  this.ttl = 1000; // How long particles should live for
  this.emissionRate = 5;
  this.maxParticles = 2000;

  this.field = new Field(this.position, 80);
}

Emitter.prototype.move = function(point) {
  this.position.add(point);
  this.field.move(this.position);
  this.isFieldMoving = true;
};

Emitter.prototype.plotParticles = function() {

  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles.getAt(i);

    // If this particle is dead, remove it from group
    if (++particle.lived >= this.ttl) {
      this.particles.remove(particle);
    }

    // Else update its velocity
    else {
      // Update velocities and accelerations to account for the fields
      particle.submitToFields(this.field);

      // Move our particles
      particle.move();
    }
  }

  // Update our global particles reference
  //particles = currentParticles;
};

Emitter.prototype.emitParticle = function() {
  if (this.particles.length >= this.maxParticles) return;

  for (var j = 0; j < this.emissionRate; j++) {
    // Use an angle randomized over the spread so we have more of a "spray"
    var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

    // The magnitude of the emitter's velocity
    var magnitude = this.velocity.getMagnitude();

    // The emitter's position
    var position = new Vector(this.position.x, this.position.y);

    // New velocity based off of the calculated angle and magnitude
    var velocity = Vector.fromAngle(angle, magnitude);

    var particle = new Particle(game, 'particle', position, velocity);
    //particle.tint = 0xffffff;
    particle.scale.set(0.1);
    this.particles.add(particle);
  }
};

Emitter.prototype.update = function() {
  this.emitParticle();
  this.plotParticles();
  this.field.update();
};