import log from '../helpers/log.mjs';

class View {
  constructor(canvas) {
    this.context = canvas.getContext('2d');
    this.width = 426;
    this.height = 240;

    this.context.width = this.width;
    this.context.width = this.width;
  }

  // Draw the buffer canvas to the final display canvas
  render(renderer) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(renderer, 0, 0);
  }
}

export default View;