// import log from '../helpers/log.mjs';

class View {
  constructor(canvas) {
    this.context = canvas.getContext(`2d`);
    this.width = 426;
    this.height = 240;

    this.context.canvas.width = this.width;
    this.context.canvas.width = this.width;
    this.context.width = this.width;
    this.context.width = this.width;

    this.cameraSpeed = 0.3;
    this.horCameraVelocity = 0;
    this.verCameraVelocity = 0;
    this.cameraPositionX = 0;
    this.cameraPositionY = 0;
  }

  ajustCamera(renderer, player) {

    const playerX = player.positionX + (player.width / 2);
    const cameraXTarget = playerX - (this.width / 4);
    const differenceX = this.cameraPositionX - cameraXTarget;
    this.cameraPositionX = this.cameraPositionX - (differenceX * this.cameraSpeed);

    const playerY = player.positionY + (player.height / 2);
    const cameraYTarget = playerY - (this.height/2);
    const differenceY = this.cameraPositionY - cameraYTarget;
    this.cameraPositionY = this.cameraPositionY - (differenceY * this.cameraSpeed);

    if (this.cameraPositionX < 0) {
      this.cameraPositionX = 0;
    }

    if (this.cameraPositionY < 0) {
      this.cameraPositionY = 0;
      this.horCameraVelocity = 0;
    }

    if (this.cameraPositionY + this.height > renderer.height) {
      this.cameraPositionY = renderer.height - this.height;
    }

    if (this.cameraPositionX + this.width > renderer.width) {
      this.cameraPositionX = renderer.width - this.width;
    }

    this.cameraPositionX = Math.floor(this.cameraPositionX);
    this.cameraPositionY = Math.floor(this.cameraPositionY);

  }

  // Draw the buffer canvas to the final display canvas
  render(renderer, player) {

    // Warn if the world is smaller than the viewport
    if (renderer.height < this.height || renderer.width < this.width) {
      console.error(`The world is too small. Minimum size is ${this.width}x${this.height}`);
    }
    
    // Clear the stage
    this.context.clearRect(0, 0, this.width, this.height);

    // Ajust the camera
    this.ajustCamera(renderer, player);
    
    // Draw the renderer canvas to the final canvas
    this.context.drawImage(renderer, -this.cameraPositionX, -this.cameraPositionY);    
  }
}

export default View;