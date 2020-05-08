class Ground {
  constructor(spriteSheet, x, y) {
    this.width = 8;
    this.height = 8;

    this.spriteSheet = spriteSheet;

    this.boundingBox = {
      x: 0,
      y: 0,
      width: 16,
      height: 8
    };

    this.isStatic = true;
    this.isSolid = true;
    this.isTouched = false;

    this.renderer = document.createElement(`canvas`).getContext(`2d`);
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

    this.positionX = x;
    this.positionY = y;

    this.testTimer = null;
    this.shouldBeRendered = true;
  }

  update() {
    if (this.shouldBeRendered) {
      this.render();
      this.shouldBeRendered = false;
    }
  }

  render() {
    this.renderer.drawImage(this.spriteSheet, -16, -8);
  }

}

export default Ground;