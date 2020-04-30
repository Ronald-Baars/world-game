import World from './modules/World.mjs';

class Model {
  constructor(brand) {
    this.world = new World();
  }

  update() {
    this.world.update();
  }
}

export default Model;