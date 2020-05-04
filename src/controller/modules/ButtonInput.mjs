class ButtonInput {
  constructor() {
    this.active = false;
    this.down = false;
  }

  setInput(down, e) {
    e.preventDefault();

    // If the down-state is updated, update active state too
    if (this.down !== down) this.active = down;
    this.down = down;
  }
}

export default ButtonInput;