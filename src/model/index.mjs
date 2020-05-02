import World from './modules/World.mjs';

class Model {
  constructor(assets) {
    this.assets = assets;
    this.world = new World(assets);

    this.renderer = document.createElement(`canvas`).getContext(`2d`);
    this.renderer.canvas.width = this.world.width;
    this.renderer.canvas.height = this.world.height;
  }


  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.world.width, this.world.height);

    // Draw the player
    this.renderer.drawImage(this.world.renderer.canvas, 0, 0);
  }

  update() {
    // Run the update function
    this.world.update();
    this.render();
  }
}

export default Model;