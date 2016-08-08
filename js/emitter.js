Emitter = function(key, point, velocity, spread) {
  Phaser.Sprite.call(this, game, point.x, point.y, key);
  this.position = point; // Vector
  this.emitVelocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.drawColor = "#999"; // So we can tell them apart from Fields later
  this.particles = game.add.group();
  this.isFieldMoving = false;

  //this.ttl = Math.random() * 500; // How long particles should live for
  this.emissionRate = 20;
  this.maxParticles = 5000;

  this.field = new Field(this.position, 10);
};

Emitter.prototype = Object.create(Phaser.Sprite.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.emitParticle = function() {
  if (this.particles.length >= this.maxParticles) return;

  for (var j = 0; j < this.emissionRate; j++) {
    // Use an angle randomized over the spread so we have more of a "spray"
    var angle = this.emitVelocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

    // The magnitude of the emitter's velocity
    var magnitude = this.emitVelocity.getMagnitude();

    // The emitter's position
    var position = new Vector(this.position.x, this.position.y);

    // New velocity based off of the calculated angle and magnitude
    var velocity = Vector.fromAngle(angle, magnitude);

    var particle = new Particle('particle', position, velocity);
    particle.tint = 0x0000ff;
    particle.scale.set(0.05);
    this.particles.add(particle);
  }
};

Emitter.prototype.plotParticles = function() {

  for (var i = 0; i < this.particles.length; i++) {
    var particle = this.particles.getAt(i);

    // If this particle is dead, remove it from group
    if (++particle.lived >= particle.ttl || particle.totalDistance > 300) {
      this.particles.remove(particle);
    }

    // Else update its velocity
    else {
      // Update velocities and accelerations to account for the fields and then move the particles
      particle.move(this.field);
    }
  }

  // Update our global particles reference
  //particles = currentParticles;
};

Emitter.prototype.move = function(point) {
  this.position.add(point);
  this.field.move(this.position);
  this.isFieldMoving = true;
};

Emitter.prototype.update = function() {
  this.emitParticle();
  this.plotParticles();
  this.field.update();
};