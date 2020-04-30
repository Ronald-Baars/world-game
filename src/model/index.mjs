import World from './modules/World.mjs';

class Model {
  constructor(assets) {
    this.assets = assets;
    this.world = new World();
  }

  update() {
    this.world.update();
  }
}

export default Model;