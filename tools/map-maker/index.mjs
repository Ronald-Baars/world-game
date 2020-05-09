import assetLoader from '../../src/helpers/assetLoader.mjs';
import drawGrid from './helpers/drawGrid.mjs';
import drawElements from './helpers/drawElements.mjs';
import Element from './helpers/Element.mjs';

const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = 3128 / 4;
canvas.height = 1482 / 4;

const assetsToLoad = {
  'spriteSheet': `sprites/land/scenery_day.png`,
  'spriteData': `sprites/land/scenery_day.json`,
};

const onLoadComplete = (loadedAssets) => {
  const zoom = 2;
  const gridSize = 8 * zoom;
  const width = 100;
  const height = 40;
  const assets = loadedAssets;
  let elements = [];

  let mouseDown = false;
  let drawing = true; // Toggle between drawing or ereasing
  
  let selectedSliceId = `land_grass`;
  let selectedElementType = `Ground`;

  drawGrid({ gridSize, width, height, ctx, assets });

  canvas.addEventListener(`mousedown`, (e) => {
    mouseDown = true;
    drawing = !elements.find(element => element.x === (Math.floor((e.x - e.target.getBoundingClientRect().x - 2) / gridSize)) * gridSize && element.y === (Math.floor((e.y - e.target.getBoundingClientRect().y - 2) / gridSize)) * gridSize);
  });
  canvas.addEventListener(`mouseup`, () => mouseDown = false);
  canvas.addEventListener(`mousemove`, e => {
    if (!mouseDown) return;
    const x = e.x - e.target.getBoundingClientRect().x - 2;
    const y = e.y - e.target.getBoundingClientRect().y - 2;

    if (x < 0 || y < 0 || x > width * gridSize || y > height * gridSize) return;

    const clickedCell = {
      xCell: Math.floor(x / gridSize),
      yCell: Math.floor(y / gridSize),
      cellTop: (Math.floor(y / gridSize)) * gridSize,
      cellLeft: (Math.floor(x / gridSize)) * gridSize,
    };

    // Try to find an existing element at in clicked cell
    const existingElementAtLocation = elements.find(element => element.x === clickedCell.cellLeft && element.y === clickedCell.cellTop);
    if (existingElementAtLocation && !drawing) {
      // If it exists, remove it
      elements = elements.filter(element => element.x !== clickedCell.cellLeft || element.y !== clickedCell.cellTop);
    } else if (drawing) {
      // If it doesn't exist, add the new element to the array
      elements.push(new Element(selectedElementType, selectedSliceId, clickedCell.cellLeft, clickedCell.cellTop, gridSize, gridSize));
    }
    
    // Redraw everything
    ctx.clearRect(0, 0, width * gridSize, height * gridSize);
    drawGrid({ gridSize, width, height, ctx, assets });
    drawElements({ ctx, elements, loadedAssets, zoom });
  });
  
};

assetLoader(assetsToLoad, onLoadComplete);

