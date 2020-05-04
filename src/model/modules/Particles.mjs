class Particle {
  constructor(areaWidth, areaHeight) {
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
    this.safetyMargin = Math.min(this.areaWidth, this.areaHeight, 100) / 5;
    this.opacity = Math.random();
    this.isOutOfBounds = false;

    console.log(this.safetyMargin);

    this.x = this.safetyMargin + (Math.random() * (this.areaWidth - (this.safetyMargin * 2)));
    this.y = this.safetyMargin + (Math.random() * (this.areaHeight - (this.safetyMargin * 2)));

    this.direction = Math.random() * 360;
    this.speed = 0.25 + (Math.random() / 4);
    this.turnRightOrLeft = !!Math.round(Math.random()); // random boolean
  }

  update() {
    if (this.opacity >= 1) {
      this.opacity -= 0.05;
    } else if (this.opacity <= 0.5) {
      this.opacity += 0.05;
    } else {
      this.opacity += Math.round(Math.random()) ? 0.05 : -0.05; // random boolean
    }

    // If the particle is almost out of the area, turn it around
    if (this.y < this.safetyMargin || this.y > this.areaHeight - this.safetyMargin || this.x < this.safetyMargin || this.x > this.areaWidth - this.safetyMargin) {
      if (this.turnRightOrLeft) {
        this.direction += this.safetyMargin * 0.4;
      } else {
        this.direction -= this.safetyMargin * 0.4;
      }

      this.isOutOfBounds = true;
    } else {
      // If the particle was out of the safe zone, we choose a new direction
      // to turn in when it reaches the border again.
      if (this.isOutOfBounds) {
        this.turnRightOrLeft = !!Math.round(Math.random()); // random boolean
        this.isOutOfBounds = false;
      }
      this.direction += (Math.random() * 10) - 5;
    }

    this.x = this.x + this.speed * Math.cos(this.direction * Math.PI / 180);
    this.y = this.y + this.speed * Math.sin(this.direction * Math.PI / 180);
  }
}


class Particles {
  constructor(particleCount, x, y, width, height) {
    this.particleCount = particleCount;
    this.positionX = x;
    this.positionY = y;

    // The pre-rendering canvas element to render the user on
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    // Get the players size from the spritesheet
    this.renderer.canvas.width = this.width = width;
    this.renderer.canvas.height = this.height = height;

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  update() {
    this.particles.forEach(particle => particle.update());
    this.render();
  }

  render() {
    this.renderer.clearRect(0, 0, this.width, this.height);

    
    // Draw the particles
    this.particles.forEach(({ x, y, opacity }) => {
      this.renderer.fillStyle = `rgba(255, 255, 160, ${opacity})`;
      this.renderer.fillRect(x, y, 0.7, 0.7);
    });
  
    // this.renderer.strokeRect(0, 0, this.width, this.height);
  }

}

export default Particles;