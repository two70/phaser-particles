Emitter = function(universeParticles, field, key) {
  this.field = field; // The field that this emitter belongs to
  this.position = new Vector(field.position.x, field.position.y); // Vector
  Phaser.Sprite.call(this, game, this.position.x, this.position.y, key);

  this.velocity = new Vector(0,0);
  this.emitVelocity = new Vector(0.1,0.1); // Vector
  this.spread = Math.PI; // 
  this.particles = universeParticles;
  this.anchor.setTo(0.5,0.5);
  this.scale.set(0.2);
  this.particleMass = 0.01;
  this.emissionRate = 10;
  this.maxParticles = 5000;
  this.tint = 0x00ffff;
  this.angle = 0;
  game.time.events.loop(Phaser.Timer.SECOND, this.emitParticle, this);
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

    var particle = new Particle('particle', position, velocity, this.particleMass);
    particle.tint = 0x0000ff;
    particle.scale.set(0.05);
    this.particles.add(particle);
  }
};

Emitter.prototype.updateField = function(field) {
  this.field = field;
  console.log("updated field");
};

Emitter.prototype.update = function() {
  var x = this.field.position.x - this.position.x;
  var y = this.field.position.y - this.position.y;
  var distanceField = Math.sqrt(x*x+y*y);

  if (distanceField < 200) {
    var radius = 100;//this.field.mass * 5;
    this.position.x = this.field.position.x + radius * Math.cos(this.angle * Math.PI / 180);
    this.position.y = this.field.position.y + radius * Math.sin(this.angle * Math.PI / 180);
    this.angle += 0.2;
    if(this.angle > 360) this.angle = 0;
    console.log(this.angle);
  }
  else {
    var normalized = new Vector();
    normalized.x = x / distanceField;
    normalized.y = y / distanceField;
    //console.log(normalized);
    this.position.x += normalized.x;
    this.position.y += normalized.y;
    //console.log(this.position.getAngle());
    //this.position.add(this.velocity);
  }


};