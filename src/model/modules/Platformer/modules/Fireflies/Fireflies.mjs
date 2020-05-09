class Firefly {
  constructor( width, height ) {
    this.width = width;
    this.height = height;
    this.safetyMargin = Math.min(this.width, this.height, 100) / 5;
    this.opacity = Math.random();
    this.isOutOfBounds = false;

    this.x = this.safetyMargin + (Math.random() * (this.width - (this.safetyMargin * 2)));
    this.y = this.safetyMargin + (Math.random() * (this.height - (this.safetyMargin * 2)));

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

    // If the firefly is almost out of the area, turn it around
    if (this.y < this.safetyMargin || this.y > this.height - this.safetyMargin || this.x < this.safetyMargin || this.x > this.width - this.safetyMargin) {
      if (this.turnRightOrLeft) {
        this.direction += this.safetyMargin * 0.4;
      } else {
        this.direction -= this.safetyMargin * 0.4;
      }

      this.isOutOfBounds = true;
    } else {
      // If the firefly was out of the safe zone, we choose a new direction
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

class Fireflies {
  constructor({ count, x, y, width, height, showBoundaries = false }) {
    this.fireflyCount = count;
    this.positionX = x;
    this.positionY = y;
    this.showBoundaries = showBoundaries;

    // The pre-rendering canvas element to render the user on
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    // Get the players size from the spritesheet
    this.renderer.canvas.width = this.width = width;
    this.renderer.canvas.height = this.height = height;

    this.fireflies = [];
    for (let i = 0; i < count; i++) {
      this.fireflies.push(new Firefly(this.width, this.height));
    }
  }

  update(playerX) {
    if (Math.abs(playerX - this.positionX) < 150) {
    this.fireflies.forEach(firefly => firefly.update());
    this.render();
    }
  }


  render() {
    this.renderer.clearRect(0, 0, this.width, this.height);
    
    // Draw the Fireflies
    this.fireflies.forEach(({ x, y, opacity }) => {
      this.renderer.fillStyle = `rgba(255, 255, 160, ${opacity})`;
      this.renderer.fillRect(x, y, 0.7, 0.7);
    });
  
    if (this.showBoundaries) this.renderer.strokeRect(0, 0, this.width, this.height);
  }

}

export default Fireflies;