import getElementAtLocation from '../helpers/getElementAtLocation.mjs';
import Player from './Player.mjs';
import Ground from './Ground.mjs';
import Scenery from './Scenery.mjs';

class World {
  constructor(assets) {

    this.width = 800;
    this.height = 240;

    this.level = 1;
    this.friction = 0.8;
    this.gravity = 2;

    // Create the objects
    this.player = new Player(assets.sprite_player, assets.sprite_player_data, 10, 30);
    this.layers = {
      background: [

        // Shrubberies
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 100, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 132, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 132, 68),

        // Shrubberies
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 300, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 332, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 332, 68),

      ],
      level: [

        // Start platform
        new Ground(assets.sprite_scenery_day, 0, 80),
        new Ground(assets.sprite_scenery_day, 8, 80),
        new Ground(assets.sprite_scenery_day, 16, 80),
        new Ground(assets.sprite_scenery_day, 24, 80),
        new Ground(assets.sprite_scenery_day, 32, 80),
        new Ground(assets.sprite_scenery_day, 40, 80),

        // Shrubberies Platform
        new Ground(assets.sprite_scenery_day, 84, 100),
        new Ground(assets.sprite_scenery_day, 92, 92),
        new Ground(assets.sprite_scenery_day, 100, 100),
        new Ground(assets.sprite_scenery_day, 108, 100),
        new Ground(assets.sprite_scenery_day, 116, 100),
        new Ground(assets.sprite_scenery_day, 124, 100),
        new Ground(assets.sprite_scenery_day, 132, 100),
        new Ground(assets.sprite_scenery_day, 140, 100),
        new Ground(assets.sprite_scenery_day, 148, 100),

        // Stairs
        new Ground(assets.sprite_scenery_day, 156, 99),
        new Ground(assets.sprite_scenery_day, 164, 96),
        new Ground(assets.sprite_scenery_day, 172, 94),
        new Ground(assets.sprite_scenery_day, 180, 90),
        new Ground(assets.sprite_scenery_day, 188, 88),
        new Ground(assets.sprite_scenery_day, 196, 88),
        new Ground(assets.sprite_scenery_day, 204, 88),
        new Ground(assets.sprite_scenery_day, 212, 88),
        new Ground(assets.sprite_scenery_day, 220, 88),
        new Ground(assets.sprite_scenery_day, 228, 92),
        new Ground(assets.sprite_scenery_day, 236, 96),
        new Ground(assets.sprite_scenery_day, 244, 96),
        new Ground(assets.sprite_scenery_day, 252, 98),

        // Platform after stairs
        new Ground(assets.sprite_scenery_day, 260, 100),
        new Ground(assets.sprite_scenery_day, 268, 100),
        new Ground(assets.sprite_scenery_day, 276, 100),
        new Ground(assets.sprite_scenery_day, 284, 100),
        new Ground(assets.sprite_scenery_day, 292, 100),
        new Ground(assets.sprite_scenery_day, 300, 100),
        new Ground(assets.sprite_scenery_day, 308, 100),
        new Ground(assets.sprite_scenery_day, 316, 100),
        new Ground(assets.sprite_scenery_day, 324, 100),
        new Ground(assets.sprite_scenery_day, 332, 100),
        new Ground(assets.sprite_scenery_day, 340, 100),
        new Ground(assets.sprite_scenery_day, 348, 100),
        new Ground(assets.sprite_scenery_day, 356, 100),
        new Ground(assets.sprite_scenery_day, 364, 100),
        new Ground(assets.sprite_scenery_day, 372, 100),
        new Ground(assets.sprite_scenery_day, 380, 100),

        // High platform
        new Ground(assets.sprite_scenery_day, 84, 20),
        new Ground(assets.sprite_scenery_day, 100, 20),
        new Ground(assets.sprite_scenery_day, 116, 20),
      ],

      foreground: [
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 124, 68),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 108, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_cactus`, 116, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 124, 92),

        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 324, 68),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 300, 68),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_pinetree`, 280, 68),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 308, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_cactus`, 316, 92),
        new Scenery(assets.sprite_scenery_day, assets.sprite_scenery_day_data, `vegetation_bulrush`, 324, 92),
      ],
    };

    // Create a canvas to render the world to
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    // Set the size of the canvas
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

  }

  render() {
    // Clear the stage
    this.renderer.clearRect(0, 0, this.width, this.height);

    // Draw the background
    this.layers.background.forEach(element => this.renderer.drawImage(element.renderer.canvas, element.positionX, element.positionY));

    // Draw the player
    this.renderer.drawImage(this.player.renderer.canvas, this.player.positionX, this.player.positionY);

    // Draw the level
    this.layers.level.forEach(element => this.renderer.drawImage(element.renderer.canvas, element.positionX, element.positionY));

    // Draw the foreground
    this.layers.foreground.forEach(element => this.renderer.drawImage(element.renderer.canvas, element.positionX, element.positionY));

  }

  update() {

    // Apply the gravity to the player
    this.player.verVelocity += this.gravity;

    // Apply the friction to the player
    this.player.horVelocity = Math.round((this.player.horVelocity * this.friction) * 100) / 100;

    this.player.verVelocity *= this.friction;

    // Run the update function
    Object.values(this.layers).forEach(layer => layer.forEach(element => element.update(this.player.positionX)));
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
      width: this.player.boundingBox.width,
      height: this.player.boundingBox.height
    });

    // The area the player is in, with a field around it to detect nearby elements
    const detectionArea = {
      right: playerArea().right - nearbyField,
      top: playerArea().top - nearbyField,
      left: playerArea().left + nearbyField,
      bottom: playerArea().bottom + nearbyField,
    };

    // Filters out all non-solid elements, and the ones that are not in the detectionArea
    let nearby = this.layers.level.filter(element => element.isStatic && element.isSolid).filter(element => detectionArea.right < element.positionX + element.width && detectionArea.left > element.positionX && detectionArea.top < element.positionY && detectionArea.bottom > element.positionY + element.height);

    const belowPlayer = [
      ...getElementAtLocation(playerArea().left + (playerArea().width / 4), playerArea().bottom, nearby),
      ...getElementAtLocation(playerArea().right - (playerArea().width / 4), playerArea().bottom, nearby),
    ];
    const abovePlayer = [
      ...getElementAtLocation(playerArea().left, playerArea().top - 1, nearby),
      ...getElementAtLocation(playerArea().right, playerArea().top - 1, nearby),
    ];

    // If there is a solid object below the player, she's standing
    this.player.isStanding = !!belowPlayer.length;

    belowPlayer.forEach(element => {
      this.player.verVelocity = 0;
      this.player.positionY = element.positionY - this.player.height;
    });

    abovePlayer.forEach(element => {
      this.player.verVelocity = -this.player.verVelocity;
      this.player.positionY = element.positionY + element.height;
    });

    const leftOfPlayer = getElementAtLocation(playerArea().left, playerArea().bottom - this.player.stepHeight, nearby);
    const rightOfPlayer = getElementAtLocation(playerArea().right, playerArea().bottom - this.player.stepHeight, nearby);
    leftOfPlayer.forEach(element => {
      this.player.horVelocity = 0;
      this.player.positionX = element.positionX + element.width - this.player.boundingBox.x;
    });

    rightOfPlayer.forEach(element => {
      this.player.horVelocity = 0;
      this.player.positionX = element.positionX - (this.player.boundingBox.x + this.player.boundingBox.width);
    });

  }

}

export default World;