class Player {
  constructor(spriteSheet) {
    this.renderer = document.createElement('canvas').getContext('2d');
    this.spriteSheet = {
      image: spriteSheet,
      columns: 10,
      rows: 1,
    };

    this.horVelocity = 0;
    this.verVelocity = 0;
    this.positionX = 0;
    this.positionY = 0;
  }

  update() {
    // Calculate the new position of the player
    this.positionX += this.horVelocity;
    this.positionY += this.verVelocity;

    this.render();
  };

  render() {
    this.renderer.fillStyle = "red";
    this.renderer.fillRect(0, 0, 20, 20);
  }

  // User input functions
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