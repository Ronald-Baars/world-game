import log from '../../helpers/log.mjs';

class Scenery {
  constructor(spriteSheet, spriteData, sliceId, x, y) {
    this.sliceId = sliceId;
    this.spriteSheet = spriteSheet;
    this.isStatic = true;
    this.isSolid = false;
    this.animationRadius = 180;

    // Check if we can find the data about the requested slice
    const sliceData = spriteData.meta.slices.find(slice => slice.name === this.sliceId);
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    if (sliceData) {
      // If so, read out the data we need to show the animation
      this.sliceBounds = sliceData.keys[0].bounds;
      this.frameBounds = spriteData.frames.map(({ frame }) => frame);

      this.width = this.sliceBounds.w;
      this.height = this.sliceBounds.h;

      this.renderer.canvas.width = this.width;
      this.renderer.canvas.height = this.height;

      this.positionX = x;
      this.positionY = y;
      this.currentFrame = 0;
      this.shouldBeRendered = true;

    } else {
      // If not, show an error and return
      log(`Slice "${this.sliceId}" not found`);
      return;
    }
  }

  update(playerX) {
    if (this.shouldBeRendered) {
      
      const distance = Math.abs(playerX - this.positionX);
      if (distance > this.animationRadius) return;    
      const newFrame = this.frameBounds.length - Math.floor((this.frameBounds.length / this.animationRadius) * (distance - (this.animationRadius / 5))) - 2;
    
      // Only go to the new frame if it's bigger than the current one
      if (newFrame > this.currentFrame) {
        this.currentFrame = newFrame;

        this.render();
      }

      if (newFrame === this.frameBounds.length) this.shouldBeRendered = false;
    }
    
  }

  render() {
    if (this.frameBounds[Math.floor(this.currentFrame)]) {
      this.renderer.clearRect(0, 0, this.width, this.height);
      this.renderer.drawImage(this.spriteSheet, -(this.sliceBounds.x + this.frameBounds[Math.floor(this.currentFrame)].x), -(this.sliceBounds.y + this.frameBounds[Math.floor(this.currentFrame)].y));
    }
  }

}

export default Scenery;