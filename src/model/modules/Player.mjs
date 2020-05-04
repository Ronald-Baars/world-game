import getSpriteFromSpritesheet from '../helpers/getSpriteFromSpritesheet.mjs';
class Player {
  constructor(spriteSheet, spriteData, spawnX, spawnY) {

    this.sprite = {
      sheet: spriteSheet,
      data: spriteData,
    };

    // The pre-rendering canvas element to render the user on
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    // Get the players size from the spritesheet
    this.renderer.canvas.width = this.width = this.sprite.data.frames[0].frame.w;
    this.renderer.canvas.height = this.height = this.sprite.data.frames[0].frame.h;

    // Define a bounding box
    this.boundingBox = {
      x: 4,
      y: 0,
      width: 8,
      height: 16
    };

    // The spawn position of the player
    this.positionX = spawnX;
    this.positionY = spawnY;

    // Set Player specific variables
    this.horVelocity = 1;       // The horizontal speed of the user (1 to let the player face left)
    this.verVelocity = 0;       // The vertical speed of the player
    this.animation = `stand`;   // The action the player is doing 
    this.direction = `right`;   // The direction the player is facing in
    this.animationFrame = 0;    // A counter for the current animation frame
    this.walkSpeed = 1.1;       // Speed of walking left and right
    this.jumpHeight = 14;       // Height of the jump
    this.godMode = false;       // If enabled, the player can fly
    this.maxDashCount = 1;      // Amount of mid-air dashes
    this.currentJumpDashes = 0; // A counter to count the amount of dashes in the current jump
    this.stepHeight = 4;        // The maximum height of an object to climb without jumping

    // Actions
    this.isStanding = false;    // True if the players feet are touching a surface and has no speed
    this.isWalking = false;    // True if the players feet are touching a surface and has some speed
    this.isJumping = false;     // True if the player is jumping (false when falling)
    
  }


  
  /*************************************
  **               UPDATE             **
  **                                  **
  ** Checks whether the player should **
  ** be re-rendered or updated.       **
  *************************************/
  
  update() {
    // Calculate the new position of the player
    this.positionX = Math.round(this.positionX + this.horVelocity);
    this.positionY = Math.round(this.positionY + this.verVelocity);

    if (this.isStanding && this.isJumping) this.isJumping = false;
    this.render();
  }



  /********************************
  **      RENDER THE PLAYER      **
  ********************************/

  render() {
    const spritePosition = getSpriteFromSpritesheet(this.animation, this.direction, this.sprite, Math.floor(this.animationFrame));

    this.getCurrentAction();
    // Draw the sprite
    this.renderer.clearRect(0, 0, this.width, this.height);
    this.renderer.drawImage(this.sprite.sheet, -spritePosition.x, -spritePosition.y);

    // Get ready for the next animationFrame
    this.animationFrame += (Math.abs(this.verVelocity) + Math.abs(this.horVelocity)) / 6;
  }
  
  
  
  /******************************************
  **         GET THE CURRENT ACTION        **
  **                                       **
  ** Switches between different animations **
  ** and toggles action variables.         **
  ******************************************/
  
  getCurrentAction() {
    
    // This is used to be able to pause an animation for a few times
    if (this.pauseAnimation > 0) { this.pauseAnimation -= 1; return; }
    
    const oldDirection = this.direction;
    this.direction = this.horVelocity > 0 ? `right` : `left`;

    if (oldDirection !== this.direction && oldDirection !== `flip`) {
      this.direction = `flip`;
      this.pauseAnimation = 1;
    }

    // If the speed is high enough, show the walking animation
    if (Math.abs(this.horVelocity) > 0.5) {
      this.isWalking = true;
      this.isStanding = false;
      this.animation = `walk`;
      return;
    } else {
      this.isWalking = false;
      this.isStanding = true;
      this.animation = `stand`;
      return;
    }

  }


  /********************************
  **     USER INPUT HANDLERS     **
  ********************************/
  moveLeft() {
    this.horVelocity = Math.floor((this.horVelocity - this.walkSpeed) * 100) / 100;
  }

  moveRight() {
    this.horVelocity = Math.floor((this.horVelocity + this.walkSpeed) * 100) / 100;
  }

  jump() {
    if (this.isStanding || this.godMode) {
      this.isJumping = true;
      this.isStanding = false;
      this.isWalking = false;

      this.currentJumpDashes = this.maxDashCount;
      this.verVelocity -= this.godMode ? 3 : this.jumpHeight;
    } else if (this.currentJumpDashes > 0 && this.isJumping) {
      this.currentJumpDashes -= 1;
      this.verVelocity -= this.jumpHeight;
    }
  }

  toggleGodmode() {
    this.godMode = !this.godMode;
  }
}

export default Player;