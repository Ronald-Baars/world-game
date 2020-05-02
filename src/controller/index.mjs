import ButtonInput from './modules/ButtonInput.mjs';

class Controller {
  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
  }

  handleKey({ type, key }) {
    // true if the event type is keydown
    const down = type === `keydown`;

    // Connect keys to ButtonInputs
    switch (key) {
      case `ArrowLeft`: this.left.setInput(down); break;
      case `ArrowRight`: this.right.setInput(down); break;
      case `ArrowUp`: this.up.setInput(down); break;
    }
  }
}

export default Controller;