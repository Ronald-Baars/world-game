import log from '../helpers/log.mjs';

class View {
  constructor(canvas) {
    this.context = canvas.getContext('2d');
    this.width = 426;
    this.height = 240;

    this.context.width = this.width;
    this.context.width = this.width;

    this.cameraSpeed = 0.3;
    this.horCameraVelocity = 0;
    this.verCameraVelocity = 0;
    this.cameraPositionX = 0;
    this.cameraPositionY = 0;
  }

  ajustCamera(player) {

    this.horCameraVelocity = (player.positionX - this.cameraPositionX) * this.cameraSpeed;
    this.verCameraVelocity = (player.positionY - this.cameraPositionY) * this.cameraSpeed;

    // Tween the camera movements
    this.cameraPositionX = this.cameraPositionX + this.horCameraVelocity;
    this.cameraPositionY = this.cameraPositionY + this.verCameraVelocity;

  }

  // Draw the buffer canvas to the final display canvas
  render(renderer, player) {
    // Clear the stage
    this.context.clearRect(0, 0, this.width, this.height);

    // Ajust the camera
    this.ajustCamera(player);

    // Draw the renderer canvas to the final canvas
    this.context.drawImage(renderer, Math.floor(-this.cameraPositionX + (this.width / 4)), Math.floor(-this.cameraPositionY + (this.height / 4)));
    // this.context.drawImage(renderer, 0, 0);
  }
}

export default View;