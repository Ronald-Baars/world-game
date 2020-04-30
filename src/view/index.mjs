import log from '../helpers/log.mjs';

class View {
  constructor(canvas) {
    this.buffer = document.createElement('canvas').getContext('2d');
    this.context = canvas.getContext('2d');
    this.width = 426;
    this.height = 240;

    this.buffer.width = this.context.width = this.width;
    this.buffer.height = this.context.height = this.height;
  }

  // Draw the buffer canvas to the final display canvas
  render() {
    this.context.drawImage(this.buffer.canvas, 0, 0);
  }
}

export default View;