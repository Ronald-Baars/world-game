import log from '../helpers/log.mjs';

class View {
  constructor(brand) {
    this.carname = brand;
  }

  resize() {
    log('resize');
  }
}

export default View;