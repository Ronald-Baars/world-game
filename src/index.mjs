import Model from './model/index.mjs';
import View from './view/index.mjs';
import Controller from './controller/index.mjs';
import Engine from './engine/index.mjs';
import assetLoader from './helpers/assetLoader.mjs';



/**********************************
**            PRELOAD            **
**********************************/

// Make a place where we store all assets
const assets = {};

// Preload all the assets we will need during the game
const preloader = () => {

  const assetsToLoad = {
    'sprite_player': `sprites/characters/player.png`,
    'sprite_player_data': `sprites/characters/player.json`,
    'sprite_scenery_day': `sprites/land/scenery_day.png`,
    'sprite_scenery_day_data': `sprites/land/scenery_day.json`,
    'platformer_level_1': `levels/test.json`,
  };

  const onLoadComplete = (loadedAssets) => {
    // Disable the loading state
    window.loading = false;
    document.getElementById(`preloader`).remove();

    // Add the loaded assets to the assets array
    Object.assign(assets, loadedAssets);

    // Start the game
    init();
  };

  assetLoader(assetsToLoad, onLoadComplete);
};



/********************************
**          INITIALIZE         **
**                         
**  Called when the preloader  **
** finished loading the assets **
********************************/

// After all assets are loaded, initialize the game
const init = () => {



  /**********************************
  **              MVC              **
  **********************************/

  // Create the MVC structure
  const model = new Model(assets);
  const view = new View(document.querySelector(`canvas#game`));
  const controller = new Controller();



  /**********************************
  **             ENGINE            **
  **********************************/
  
  // Set up the render and update functions for the engine
  const render = () => {
    view.render(model.renderer.canvas, model.game.player);
  };

  // This runs every frame to update all the elements in the game
  const update = () => {

    if (controller.left.active) { model.game.player.moveLeft(); }
    if (controller.right.active) { model.game.player.moveRight(); }
    if (controller.up.active) { model.game.player.jump(); controller.up.active = model.game.player.godMode; }
    if (controller.g.active) { model.game.player.toggleGodmode(); controller.g.active = false;  }

    model.update();
  };

  const engine = new Engine(30, render, update);



  /**********************************
  **        EVENT LISTENERS        **
  **********************************/

  // Add keyboard event listeners
  const handleKey = (e) => {
    controller.handleKey(e);
  };

  window.addEventListener(`keydown`, handleKey);
  window.addEventListener(`keyup`, handleKey);

  // Resize the viewport when the browser gets resized
  const resize = () => {
    view.resize();
  };

  window.addEventListener(`resize`, resize);



  /**********************************
  **        START THE ENGINE       **
  **********************************/

  engine.start();
};



/**********************************
**      START THE PRELOADER      **
**********************************/

preloader();