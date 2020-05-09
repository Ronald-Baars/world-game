import assetLoader from '../../src/helpers/assetLoader.mjs';
import drawGrid from './helpers/drawGrid.mjs';

const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = 3128 / 4;
canvas.height = 1482 / 4;

const assetsToLoad = {
  'sprite_scenery_day': `sprites/land/scenery_day.png`,
  'sprite_scenery_day_data': `sprites/land/scenery_day.json`,
};

const onLoadComplete = (loadedAssets) => {
  drawGrid({
    gridSize: 8, 
    width: 100, 
    height: 40, 
    ctx: ctx,
    assets: loadedAssets
  });
  
};

assetLoader(assetsToLoad, onLoadComplete);

