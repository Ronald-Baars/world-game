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
  const gridSize = 16;
  const width = 100;
  const height = 40;
  const assets= loadedAssets;

  drawGrid({ gridSize, width, height, ctx, assets });

  canvas.addEventListener(`click`, e => {
    const x = e.x - e.target.getBoundingClientRect().x - 2;
    const y = e.y - e.target.getBoundingClientRect().y - 2;

    if (x < 0 || y < 0 || x > width * gridSize || y > height * gridSize) return;

    console.log(x, y);
  });
  
};

assetLoader(assetsToLoad, onLoadComplete);

