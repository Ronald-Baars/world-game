class Bird {
  constructor( width, height ) {
    this.width = width; // Width of the flyable zone
    this.height = height; // height of the flyable zone
    this.minSize = 0.5; // Minimum draw size
    this.maxSize = 2; // Maximum draw size
    this.maxSpeed = 3; // Maximum speed
    this.direction = 0; // Initial direction

    this.x = (width / 5) - (Math.random() * (Math.random() * (width / 5))); // Initial x position
    this.y = height - 1; // Initial y position

    this.size = this.minSize + (Math.random() * (this.maxSize - this.minSize)); // The size in pixels
    this.isOutOfBounds = false; // True if bird left the canvas
    this.tookOff = false; // True if the bird took off
    this.speed = Math.random() + 0.1; // Initial speed on takeoff
    // this.frame = Math.floor(Math.random() * 4); // TODO: Add sprite animation
  }

  update() {
    if (this.isOutOfBounds) return;

    if (!this.tookOff) {
      this.tookOff = Math.random() < 0.2;
      return;
    }

    if (this.x > this.width + 10 || this.y < -10) this.isOutOfBounds = true;

    this.direction = (this.y < this.height/2)
      ? this.direction + Math.random() * 1.7
      : this.direction - Math.random() * 2;
    
    this.speed = this.speed < this.maxSpeed ? this.speed * 1.1 : this.speed;

    this.x = this.x + this.speed * Math.cos(this.direction * Math.PI / 180);
    this.y = this.y + this.speed * Math.sin(this.direction * Math.PI / 180);

    // TODO: Add sprite animation to bird
    // this.frame = (this.frame + 1) % 4;
  }
}

class Birds {
  constructor({ count, x, y, showBoundaries = false }) {
    this.positionX = x; // The x position of the renderer canvas
    this.positionY = 0; // The y position of the renderer canvas
  
    this.showBoundaries = showBoundaries; // For debugging: Show the renderer boundaries 

    // The pre-rendering canvas element to render the birds on
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    this.renderer.canvas.width = this.width = 300; // Set the canvas width
    this.renderer.canvas.height = this.height = y + 2; // Set the canvas height
    this.birds = [];    // This will contain all the birds
    this.triggered = false; // True if the player is close enough to chase the birds away
    
    // Add the birds to the array
    for (let i = 0; i < count; i++) this.birds.push(new Bird(this.width, this.height));

    // Initial render
    this.render();
  }

  update(playerX) {
    if (this.disabled) return;

    // If not, check if they should be rendered
    if (Math.abs(playerX - this.positionX) < 80 || this.triggered) {
      this.triggered = true;
      this.birds.forEach((bird) => bird.update());
      this.render();

      // If all birds left the stage, set this.triggered to false
      if (!this.birds.find(({ isOutOfBounds }) => !isOutOfBounds)) this.disabled = true;
    }
  }
  
  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.width, this.height);
    
    // Draw the Birds
    this.birds.forEach(({ x, y, size }) => this.renderer.fillRect(x, y, size, size));
    
    // Debug: Draw the renderers boundaries
    if(this.showBoundaries) this.renderer.strokeRect(0, 0, this.width, this.height);
  }
}

export default Birds;