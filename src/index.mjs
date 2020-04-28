import Model from './model/index.mjs';
import View from './view/index.mjs';
import Controller from './controller/index.mjs';
import Engine from './engine/index.mjs';

//This will hold the game logic
const model = new Model();

// This will handle display resizing
const view = new View();
const controller = new Controller();
const engine = new Engine();

// Inititialize event listeners
window.addEventListener('resize', view.resize);
window.addEventListener('keydown', controller.handleKey);
window.addEventListener('keyup', controller.handleKey);

// Initialize
view.resize();
engine.start();