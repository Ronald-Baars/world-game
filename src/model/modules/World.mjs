import Player from './Player.mjs';
class World {
  constructor() {

    this.width = 480;
    this.height = 320;

    this.level = 1;
    this.friction = 0.9;
    this.gravity = 3;

    this.player = new Player();
  }

  update() {
    this.player.verVelocity -= this.gravity;
    this.player.update();
  }

}

export default World;