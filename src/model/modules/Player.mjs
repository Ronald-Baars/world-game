import getSpriteFromSpritesheet from '../helpers/getSpriteFromSpritesheet.mjs';
class Player {
  constructor(spriteSheet, spriteData, spawnX, spawnY) {
    this.width = 16;
    this.height = 16;

    this.sprite = {
      sheet: spriteSheet,
      data: spriteData,
    };

    this.boundingBox = {
      x: 4,
      y: 0,
      width: 8,
      height: 16
    };

    this.isStatic = false;

    this.renderer = document.createElement(`canvas`).getContext(`2d`);
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

    this.positionX = spawnX;
    this.positionY = spawnY;

    // Set Player specific variables
    this.horVelocity = 1;
    this.verVelocity = 0;
    this.isJumping = false;
    this.animation = `stand`;
    this.direction = `right`;
    this.animationFrame = 0;
    this.walkSpeed = 1.1;
    this.jumpHeight = 20;

    this.stepHeight = 4;
  }

  update() {
    // Calculate the new position of the player
    this.positionX = Math.round(this.positionX + this.horVelocity);
    this.positionY = Math.round(this.positionY + this.verVelocity);

    this.render();
  }

  switchAnimation() {
    
    // This is used to be able to pause an animation for a few times
    if (this.pauseAnimation > 0) { this.pauseAnimation -= 1; return; }
    
    const oldDirection = this.direction;
    this.direction = this.horVelocity > 0 ? `right` : `left`;

    if (oldDirection !== this.direction && oldDirection !== `flip`) {
      this.direction = `flip`;
      this.pauseAnimation = 1;
    }

    if (Math.abs(this.horVelocity) > 0.5) {
      this.animation = `walk`;
      return;
    } else {
      this.animation = `stand`;
      return;
    }

  }

  render() {
    const spritePosition = getSpriteFromSpritesheet(this.animation, this.direction, this.sprite, Math.floor(this.animationFrame));


    this.switchAnimation();
    // Draw the sprite
    this.renderer.clearRect(0, 0, this.width, this.height);
    this.renderer.drawImage(this.sprite.sheet, -spritePosition.x, -spritePosition.y);

    // Get ready for the next animationFrame
    this.animationFrame += (Math.abs(this.verVelocity) + Math.abs(this.horVelocity)) / 6;
  }

  // User input functions
  moveLeft() {
    this.horVelocity = Math.floor((this.horVelocity - this.walkSpeed) * 100) / 100;
  }

  moveRight() {
    this.horVelocity = Math.floor((this.horVelocity + this.walkSpeed) * 100) / 100;
  }

  jump() {
    this.verVelocity -= this.jumpHeight;
  }
}

export default Player;