Particle = function(game, key, point, velocity, acceleration) {
  Phaser.Sprite.call(this, game, point.x, point.y, key);
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
  this.lived = 0;
};

Particle.prototype = Object.create(Phaser.Sprite.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.submitToFields = function (field) {
  // our starting acceleration this frame
  var totalAccelerationX = 0;
  var totalAccelerationY = 0;

  // find the distance between the particle and the field
  var vectorX = field.position.x - this.position.x;
  var vectorY = field.position.y - this.position.y;

  // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
  var force = field.mass / Math.pow((vectorX*vectorX+field.mass/2+vectorY*vectorY+field.mass/2),1.5);

  //if (vectorX > 200 || vectorY > 200 || vectorX < -200 || vectorY < -200)
    //force *= 200;

  // add to the total acceleration the force adjusted by distance
  totalAccelerationX += vectorX * force;
  totalAccelerationY += vectorY * force;

  // update our particle's acceleration
  this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);

};

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  var newTint = (this.velocity.getMagnitude() * 1000);
  //if (newTint > 255)
    //newTint = 255;
  this.tint = newTint;//rgbToHex(0, 0, newTint);
};