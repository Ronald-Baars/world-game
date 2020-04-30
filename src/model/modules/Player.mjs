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

  };

  moveLeft() {
    console.log('Moving left');
  }

  moveRight() {

    console.log('Moving Right');
  }

  jump() {
    console.log('jumping');
  }
}

export default Player;