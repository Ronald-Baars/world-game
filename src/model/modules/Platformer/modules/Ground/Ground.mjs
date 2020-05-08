import log from '../../../../../helpers/log.mjs';

class Ground {
  constructor(spriteSheet, spriteData, sliceId, x, y, isSolid = true) {
    this.sliceId = sliceId;
    this.spriteSheet = spriteSheet;
    this.isStatic = true;
    this.isSolid = isSolid;
    this.isTouched = false;

    this.boundingBox = {
      x: 0,
      y: 0,
      width: 16,
      height: 8
    };

    this.testTimer = null;

    // Check if we can find the data about the requested slice
    const sliceData = spriteData.meta.slices.find(slice => slice.name === this.sliceId);
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    if (sliceData) {
      // If so, read out the data we need to show the animation
      this.sliceBounds = sliceData.keys[0].bounds;

      this.width = this.sliceBounds.w;
      this.height = this.sliceBounds.h;

      this.renderer.canvas.width = this.width;
      this.renderer.canvas.height = this.height;

      this.positionX = x;
      this.positionY = y;

    } else {
      // If not, show an error and return
      log(`Slice "${this.sliceId}" not found`);
      return;
    }

    this.render();
  }

  update() {

  }

  render() {
    this.renderer.clearRect(0, 0, this.width, this.height);
    this.renderer.drawImage(this.spriteSheet, -this.sliceBounds.x, -this.sliceBounds.y);
  }
}

export default Ground;