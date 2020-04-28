import log from '../helpers/log.mjs';

class Engine {
  constructor(brand) {
    this.carname = brand;
  }

  start() {
    log('Engine started');
  }
}

export default Engine;