import getSpriteFromSpritesheet from '../helpers/getSpriteFromSpritesheet.mjs';
class Player {
  constructor(sprite, spriteData, spawnX, spawnY) {
    this.width = 16;
    this.height = 16;

    this.spriteSheet = sprite;

    console.log(spriteData);

    this.boundingBox = {
      x: 4,
      y: 0,
      width: 8,
      height: 16
    };

    this.isStatic = false;

    this.renderer = document.createElement('canvas').getContext('2d');
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

    this.positionX = spawnX;
    this.positionY = spawnY;

    // Set Player specific variables
    this.horVelocity = 0;
    this.verVelocity = 0;
    this.isJumping = false;

    this.stepHeight = 4;
  }

  update() {
    // Calculate the new position of the player
    this.positionX = Math.floor(this.positionX + this.horVelocity);
    this.positionY = Math.floor(this.positionY + this.verVelocity);

    this.render();
  };

  render() {
    const spritePosition = getSpriteFromSpritesheet();
    this.renderer.drawImage(this.spriteSheet, spritePosition.x, spritePosition.y);
  }

  // User input functions
  moveLeft() {
    this.horVelocity -= 1.6;
  }

  moveRight() {
    this.horVelocity += 1.6;
  }

  jump() {
    this.verVelocity -= 20;
  }
}

export default Player;