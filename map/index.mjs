import drawMap from './helpers/drawMap.mjs';
import assetLoader from '../src/helpers/assetLoader.mjs';

const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = 3128 / 4;
canvas.height = 1482 / 4;

const assetsToLoad = {
  'map': `sprites/map/map.png`,
  'map_data': `sprites/map/map.json`,
};

const onLoadComplete = (loadedAssets) => {

  // Load the svg
  fetch(`/assets/world-map.svg`).then(response => response.text()).then(svg => {

    // Convert it to dom elements
    const mapVectorHTMLWrapper = document.createElement(`div`);
    mapVectorHTMLWrapper.innerHTML = svg;
    const mapVector = mapVectorHTMLWrapper.children[0];

    // Add a stylesheet
    const style = document.createElement(`style`);
    style.innerHTML = `
    svg * {
      shape-rendering: crispEdges;
    }
  `;
    mapVector.prepend(style);

    // Set the width and height
    mapVector.style.width = canvas.width;
    mapVector.style.height = canvas.height;

    // Convert the svg element to a data-url
    const map = document.createElement(`img`);

    // Run drawMap when the loading is complete
    map.addEventListener(`load`, () => drawMap(map, canvas, ctx, loadedAssets));

    // Start loading the new data-url
    map.src = `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(mapVector))}`;

  });
};

assetLoader(assetsToLoad, onLoadComplete);

