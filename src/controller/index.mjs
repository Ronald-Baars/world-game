import ButtonInput from './modules/ButtonInput.mjs';

class Controller {
  constructor() {
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
    this.space = new ButtonInput();
    this.g = new ButtonInput();
  }

  handleKey(e) {
    const { type, key } = e;
    // true if the event type is keydown
    const down = type === `keydown`;

    // Connect keys to ButtonInputs
    switch (key.toLowerCase()) {
      // ARROW LEFT: Walk left
      case `arrowleft`: this.left.setInput(down, e); break;

      // ARROW RIGHT: Walk right
      case `arrowright`: this.right.setInput(down, e); break;

      // ARROW UP: Jump
      case `arrowup`: this.up.setInput(down, e); break;

      // SPACEBAR: Jump / up
      case ` `: this.up.setInput(down, e); break;

      // LETTER G: Toggle godmode
      case `g`: this.g.setInput(down, e); break;
    }
  }
}

export default Controller;