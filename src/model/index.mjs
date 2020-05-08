import Platformer from './modules/Platformer/Platformer.mjs';

class Model {
  constructor(assets) {
    this.assets = assets;
    this.game = new Platformer(assets);

    this.renderer = document.createElement(`canvas`).getContext(`2d`);
    this.renderer.canvas.width = this.game.width;
    this.renderer.canvas.height = this.game.height;
  }

  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.game.width, this.game.height);

    // Draw the player
    this.renderer.drawImage(this.game.renderer.canvas, 0, 0);
  }

  update() {
    // Run the update function
    this.game.update();
    this.render();
  }
}

export default Model;