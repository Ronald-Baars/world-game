import Model from './model/index.mjs';
import View from './view/index.mjs';
import Controller from './controller/index.mjs';
import Engine from './engine/index.mjs';
import assetLoader from './helpers/assetLoader.mjs';

// Make a place where we store all assets
const assets = {};

// Preload all the assets we will need during the game
const preloader = (callback) => {

  const assetsToLoad = {
    'sprite_player': `sprites/characters/player.png`,
    'sprite_player_data': `sprites/characters/player.json`,
    'sprite_scenery_day': `sprites/land/scenery_day.png`,
    'sprite_scenery_day_data': `sprites/land/scenery_day.json`
  };

  const onLoadComplete = (loadedAssets) => {
    // Disable the loading state
    window.loading = false;
    document.getElementById(`preloader`).remove();

    // Add the loaded assets to the assets array
    Object.assign(assets, loadedAssets);

    // Start the game
    callback();
  };

  assetLoader(assetsToLoad, onLoadComplete);
};

// After all assets are loaded, initialize the game
preloader(() => {

  // Create the MVC structure
  const model = new Model(assets);
  const view = new View(document.querySelector(`canvas#game`));
  const controller = new Controller();

  // Set up the render and update functions for the engine
  const render = () => {
    view.render(model.renderer.canvas, model.world.player);
  };

  // This runs every frame to update all the elements in the game
  const update = () => {

    if (controller.left.active) { model.world.player.moveLeft(); }
    if (controller.right.active) { model.world.player.moveRight(); }
    if (controller.up.active) { model.world.player.jump(); controller.up.active = false; }

    model.update();
  };

  // Set up the engine
  const engine = new Engine(30, render, update);

  // Add event listeners
  const handleKey = (e) => {
    e.preventDefault();

    controller.handleKey({ type: e.type, key: e.key });
  };

  window.addEventListener(`keydown`, handleKey);
  window.addEventListener(`keyup`, handleKey);

  // Start the engine
  engine.start();
});
