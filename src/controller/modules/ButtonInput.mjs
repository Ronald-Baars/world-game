class ButtonInput {
  constructor(brand) {

    this.active = false;
    this.down = false;

  }

  setInput(down) {
    // If the down-state is updated, update active state too
    if (this.down !== down) this.active = down;

    this.down = down;
  }
}

export default ButtonInput;