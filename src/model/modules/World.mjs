import getElementAtLocation from '../helpers/getElementAtLocation.mjs';
import Player from './Player.mjs';
import Ground from './Ground.mjs';

class World {
  constructor(assets) {

    this.width = 800;
    this.height = 320;

    this.level = 1;
    this.friction = 0.8;
    this.gravity = 2;

    // Create the objects
    this.player = new Player(assets.sprite_player, assets.sprite_player_data, 100, 50);
    this.level = [
      new Ground(assets.sprite_dirt, 84, 100, 16, 8),
      new Ground(assets.sprite_dirt, 84, 92, 16, 8),
      new Ground(assets.sprite_dirt, 100, 100, 16, 8),
      new Ground(assets.sprite_dirt, 116, 100, 16, 8),
      new Ground(assets.sprite_dirt, 132, 100, 16, 8),
      new Ground(assets.sprite_dirt, 148, 100, 16, 8),

      // Stairs
      new Ground(assets.sprite_dirt, 164, 96, 16, 8),
      new Ground(assets.sprite_dirt, 180, 92, 16, 8),
      new Ground(assets.sprite_dirt, 196, 88, 16, 8),
      new Ground(assets.sprite_dirt, 212, 88, 16, 8),
      new Ground(assets.sprite_dirt, 228, 92, 16, 8),
      new Ground(assets.sprite_dirt, 244, 96, 16, 8),

      // Platform after stairs
      new Ground(assets.sprite_dirt, 260, 100, 16, 8),
      new Ground(assets.sprite_dirt, 276, 100, 16, 8),
      new Ground(assets.sprite_dirt, 292, 100, 16, 8),
      new Ground(assets.sprite_dirt, 292, 92, 800, 8),

      new Ground(assets.sprite_dirt, 0, 80, 16, 8),
      new Ground(assets.sprite_dirt, 16, 80, 16, 8),
      new Ground(assets.sprite_dirt, 32, 80, 16, 8),

      new Ground(assets.sprite_dirt, 84, 20, 16, 8),
      new Ground(assets.sprite_dirt, 100, 20, 16, 8),
      new Ground(assets.sprite_dirt, 116, 20, 16, 8),

    ];

    // Create a canvas to render the world to
    this.renderer = document.createElement('canvas').getContext('2d');

    // Set the size of the canvas
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

  }

  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.width, this.height);

    // Draw the level
    this.level.forEach(element => this.renderer.drawImage(element.renderer.canvas, element.positionX, element.positionY));

    // Draw the player
    this.renderer.drawImage(this.player.renderer.canvas, this.player.positionX, this.player.positionY);
  }

  update() {

    // Apply the gravity to the player
    this.player.verVelocity += this.gravity;

    // Apply the friction to the player
    this.player.horVelocity = Math.round((this.player.horVelocity * this.friction) * 100) / 100;

    console.log(this.player.horVelocity);

    this.player.verVelocity *= this.friction;

    // Run the update function
    this.level.forEach(element => element.update());
    this.player.update();

    // Check if the player collided with something in the level
    this.detectCollisions();
    this.render();
  }

  // Detect collisions
  detectCollisions() {
    // The area around the player that is considered as 'nearby'
    const nearbyField = 32;

    // The area the player is in
    const playerArea = () => ({
      right: this.player.positionX + this.player.boundingBox.x + this.player.boundingBox.width,
      top: this.player.positionY + this.player.boundingBox.y,
      left: this.player.positionX + this.player.boundingBox.x,
      bottom: this.player.positionY + this.player.boundingBox.y + this.player.boundingBox.height,
    });

    // The area the player is in, with a field around it to detect nearby elements
    const detectionArea = {
      right: playerArea().right - nearbyField,
      top: playerArea().top - nearbyField,
      left: playerArea().left + nearbyField,
      bottom: playerArea().bottom + nearbyField,
    };

    // Filters out all non-solid elements, and the ones that are not in the detectionArea
    let nearby = this.level.filter(element => element.isStatic && element.isSolid).filter(element => detectionArea.right < element.positionX + element.width && detectionArea.left > element.positionX && detectionArea.top < element.positionY && detectionArea.bottom > element.positionY + element.height);

    const belowPlayer = [
      ...getElementAtLocation(playerArea().left, playerArea().bottom, nearby),
      ...getElementAtLocation(playerArea().right, playerArea().bottom, nearby),
    ];
    const abovePlayer = [
      ...getElementAtLocation(playerArea().left, playerArea().top - 1, nearby),
      ...getElementAtLocation(playerArea().right, playerArea().top - 1, nearby),
    ];

    belowPlayer.forEach(element => {
      element.color = "yellow";
      this.player.verVelocity = 0;
      this.player.positionY = element.positionY - this.player.height;
    });

    abovePlayer.forEach(element => {
      element.color = "green";
      this.player.verVelocity = -this.player.verVelocity;
      this.player.positionY = element.positionY + element.height;
    });

    const leftOfPlayer = getElementAtLocation(playerArea().left, playerArea().bottom - this.player.stepHeight, nearby);
    const rightOfPlayer = getElementAtLocation(playerArea().right, playerArea().bottom - this.player.stepHeight, nearby);
    leftOfPlayer.forEach(element => {
      element.color = "red";
      this.player.horVelocity = 0;
      this.player.positionX = element.positionX + element.width - this.player.boundingBox.x;
    });

    rightOfPlayer.forEach(element => {
      element.color = "orange";
      this.player.horVelocity = 0;
      this.player.positionX = element.positionX - (this.player.boundingBox.x + this.player.boundingBox.width);
    });

  }

}

export default World;