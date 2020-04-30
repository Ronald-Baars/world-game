import Player from './Player.mjs';
class World {
  constructor(assets) {

    this.width = 480;
    this.height = 320;

    this.level = 1;
    this.friction = 0.9;
    this.gravity = 3;

    // Create the objects
    this.player = new Player(assets.player);

    // Create a canvas to render the world to
    this.renderer = document.createElement('canvas').getContext('2d');

    // Set the size of the canvas
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

  }

  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.width, this.height);

    // Draw the player
    this.renderer.drawImage(this.player.renderer.canvas, this.player.positionX, this.player.positionY);
  }

  update() {
    // Apply the gravity to the player
    this.player.verVelocity += this.gravity;

    // Apply the friction to the player
    this.player.horVelocity > 0
      ? this.player.horVelocity -= this.friction
      : this.player.horVelocity += this.friction;

    this.player.verVelocity > 0
      ? this.player.verVelocity -= this.friction
      : this.player.verVelocity += this.friction;

    // Run the update function
    this.player.update();
    this.render();
  }

}

export default World;