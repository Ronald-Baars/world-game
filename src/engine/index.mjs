import log from '../helpers/log.mjs';

class Engine {
  constructor(fps, render, update) {
    this.fps = fps;
    this.render = render;
    this.update = update;
  }

  start() {
    log('Engine started');
    this.renderFrame();
  }

  renderFrame() {

    this.render();
    this.update();

    // Make sure we stick to the desired fps
    // NOTE: Needs to stay in an arrow function to preserve 'this'
    setTimeout(() => { this.renderFrame(); }, 1000 / this.fps);
  }
}

export default Engine;