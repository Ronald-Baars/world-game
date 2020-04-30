class Player {
  constructor() {
    this.renderer = document.createElement('canvas').getContext('2d');
    this.spriteSheet = '';

    this.horVelocity = 0;
    this.verVelocity = 0;
    this.positionX = 0;
    this.positionY = 0;
  }

  update() {
    console.log(this.verVelocity);
  };
}

export default Player;