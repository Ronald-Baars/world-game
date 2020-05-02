class Ground {
  constructor(spriteSheet, x, y, width = 8, height = 8) {
    this.width = width;
    this.height = height;

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

    this.renderer = document.createElement('canvas').getContext('2d');
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

    this.positionX = x;
    this.positionY = y;

    this.testTimer = null;
  }

  update() {
    this.render();
  };

  render() {
    var pattern = this.renderer.createPattern(this.spriteSheet, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    this.renderer.fillStyle = pattern;
    this.renderer.fillRect(0, 0, this.width, this.height);
  }

}

export default Ground;