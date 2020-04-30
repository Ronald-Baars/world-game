import Model from './model/index.mjs';
import View from './view/index.mjs';
import Controller from './controller/index.mjs';
import Engine from './engine/index.mjs';

const render = () => {
  view.render();
};

const update = () => {

  if (controller.left.active) { model.world.player.moveLeft(); }
  if (controller.right.active) { model.world.player.moveRight(); }
  if (controller.up.active) { model.world.player.jump(); controller.up.active = false; }

  model.update();
};

const model = new Model();
const view = new View(document.querySelector('canvas#game'));
const controller = new Controller();
const engine = new Engine(30, render, update);

// Set the dimentions of the buffer canvas to the dimentions of the world
view.buffer.canvas.width = model.world.width;
view.buffer.canvas.height = model.world.height;

// Add event listeners
const handleKey = ({ type, key }) => {
  controller.handleKey({ type, key });
};

window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);

// Initialize
engine.start();

// Set loading to false
window.loading = false;
document.getElementById('preloader').remove();