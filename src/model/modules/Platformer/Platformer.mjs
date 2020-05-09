import getElementAtLocation from '../../helpers/getElementAtLocation.mjs';
import Player from './modules/Player/Player.mjs';
import Ground from './modules/Ground/Ground.mjs';
import Scenery from './modules/Scenery/Scenery.mjs';
import Fireflies from './modules/Fireflies/Fireflies.mjs';
import Birds from './modules/Birds/Birds.mjs';

class Platformer {
  constructor(assets) {

    this.width = 800;
    this.height = 240;

    this.assets = assets;

    this.level = 1;
    this.friction = 0.8;
    this.gravity = 2;

    // Create the objects
    this.player = new Player(assets.sprite_player, assets.sprite_player_data, 10, 30);

    this.layers = this.createLevel(assets.platformer_level_1);

    // Create a canvas to render the world to
    this.renderer = document.createElement(`canvas`).getContext(`2d`);

    // Set the size of the canvas
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;

  }

  createLevel(level) {
    const layers = {};

    Object.entries(level.layers).forEach(([key, elements]) => {
      if (!key || !elements) return;

      const layer = elements.map(element => {

        const elementData = {
          ...element,
          spriteSheet: this.assets[level.spriteSheet],
          spriteData: this.assets[level.spriteData],
          sliceId: element.sprite,
        };

        switch (element.type) {
          case `scenery`: return new Scenery(elementData);
          case `ground`: return new Ground(elementData);
          case `fireflies`: return new Fireflies(elementData);
          case `birds`: return new Birds(elementData);
        }
      });
      

      layers[key] = layer;
    
    });

    return layers;
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
    this.player.isInAir = !belowPlayer.length;

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

export default Platformer;