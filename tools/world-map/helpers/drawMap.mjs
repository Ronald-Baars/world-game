import rgbToHex from './rgbToHex.mjs';

export default (map, canvas, ctx, assets) => {

  const layers = {
    water: document.createElement(`canvas`).getContext(`2d`),
    coast: document.createElement(`canvas`).getContext(`2d`),
    southCoast: document.createElement(`canvas`).getContext(`2d`),
    land: document.createElement(`canvas`).getContext(`2d`),
    transitions: document.createElement(`canvas`).getContext(`2d`),
  };

  Object.entries(layers).forEach(([key, layer]) => {
    layer.canvas.width = canvas.width;
    layer.canvas.height = canvas.height;
    layer.canvas.id = key;
  });

  ctx.save();

  // Draw the image to the canvas
  ctx.drawImage(map, 0, 0, canvas.width, canvas.height);

  // Get the layers from the spritesheet
  const spriteLayers = {};
  Object.entries(assets.map_data.frames).forEach(([key, value]) => spriteLayers[key] = value.frame);
  

  // FILL THE OCEANS
  // TODO: const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_jungle`).keys[0].bounds;
  layers.water.fillStyle = `#2973bb`;
  layers.water.fillRect(0, 0, layers.water.canvas.width, layers.water.canvas.height);

  // Set some drawing settings for the water layer
  layers.water.globalCompositeOperation = `source-atop`;
  layers.water.globalAlpha = 0.6;

  // For every pixel in the image...
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {

      const getHexFromPosition = (x, y) => {
        // Get the color of the pixel
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const rgbData = { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] };
        return rgbToHex(rgbData);
      };

      const landTypes = {
        "#e9fff9": `snow`,
        "#3e6990": `water`,
        "#91972a": `highlands`,
        "#9a9e84": `mountains`,
        "#787d19": `jungle`,
        "#fcdfa6": `desert`,
      };

      const pixel = {
        current: landTypes[getHexFromPosition(x, y)],
        left: landTypes[getHexFromPosition(x - 1, y)],
        right: landTypes[getHexFromPosition(x + 1, y)],
        above: landTypes[getHexFromPosition(x, y - 1)],
        below: landTypes[getHexFromPosition(x, y + 1)],
      };
        




      // DRAW THE NORTH, EAST AND WEST COASTS
      if (pixel.current !== `water` && pixel.above && pixel.above === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x + x % bounds.w, spriteLayers.land.y + bounds.y, 1, bounds.h, x, y - bounds.h, 1, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x + x % bounds.w, spriteLayers.water.y + bounds.y, 1, bounds.h, x, y - bounds.h, 1, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_top"`);
        }
      }

      if (pixel.current !== `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y + y % bounds.h, bounds.w, 1, x, y, bounds.w, 1);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y + y % bounds.h, bounds.w, 1, x, y, bounds.w, 1);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom"`);
        }
      }

      if (pixel.current !== `water` && pixel.left && pixel.left === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y + y % bounds.h, bounds.w, 1, x - bounds.w, y, bounds.w, 1);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y + y % bounds.h, bounds.w, 1, x - bounds.w, y, bounds.w, 1);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom"`);
        }
      }

      // DRAW THE DIAGONAL NORTH COASTS
      if (pixel.current !== `water` && pixel.above && pixel.above === `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top-right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y, bounds.w, bounds.h, x + 1, y - bounds.h, bounds.w, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y, bounds.w, bounds.h, x + 1, y - bounds.h, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_top-right"`);
        }
      }

      if (pixel.current !== `water` && pixel.above && pixel.above === `water` && pixel.left && pixel.left !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top-left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y - bounds.h, bounds.w, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y - bounds.h, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_top-left"`);
        }
      }

      // DRAW THE DIAGONAL SOUTH COASTS
      if (pixel.current !== `water` && pixel.below && pixel.below === `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom-right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y, bounds.w, bounds.h, x + 1, y + 1, bounds.w, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y, bounds.w, bounds.h, x + 1, y + 1, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom-right"`);
        }
      }

      if (pixel.current !== `water` && pixel.below && pixel.below === `water` && pixel.left && pixel.left !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom-left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y + 1, bounds.w, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x, spriteLayers.water.y + bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y + 1, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom-left"`);
        }
      }






      // DRAW THE SOUTH COASTS
      if (pixel.current !== `water` && pixel.below && pixel.below === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.southCoast.drawImage(assets.map, spriteLayers.land.x + bounds.x + x % bounds.w, spriteLayers.land.y + bounds.y, 1, bounds.h, x, y + 1, 1, bounds.h);
          layers.water.drawImage(assets.map, spriteLayers.water.x + bounds.x + x % bounds.w, spriteLayers.water.y + bounds.y, 1, bounds.h, x, y + 1, 1, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom"`);
        }
      }





      // FILL THE LAND
      if (pixel.current !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_${pixel.current}`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.land.drawImage(assets.map, spriteLayers.land.x + bounds.x + x % bounds.w, spriteLayers.land.y + bounds.y + y % bounds.h, 1, 1, x, y, 1, 1);
        } else {
          console.error(`Can't find sprite "land_${pixel.current}"`);
        }
      }
        




      // DRAW TO THE TRANSITION LAYER
      if (pixel.current === `jungle` && pixel.below && pixel.below === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_from-jungle_vertical`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, spriteLayers.land.x + bounds.x + x % bounds.w, spriteLayers.land.y + bounds.y, 1, bounds.h, x, y, 1, bounds.h);
      }

      if (pixel.current === `jungle` && pixel.above && pixel.above === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_to-jungle_vertical`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, spriteLayers.land.x + bounds.x + x % bounds.w, spriteLayers.land.y + bounds.y, 1, bounds.h, x, y - bounds.h, 1, bounds.h);
      }

      if (pixel.current === `jungle` && pixel.right && pixel.right === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_from-jungle_horizontal`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y + y % bounds.h, bounds.w, 1, x, y, bounds.w, 1);
      }

      if (pixel.current === `jungle` && pixel.left && pixel.left === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_to-jungle_horizontal`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, spriteLayers.land.x + bounds.x, spriteLayers.land.y + bounds.y + y % bounds.h, bounds.w, 1, x - bounds.w, y, bounds.w, 1);
      }
    }
  }

  ctx.restore();

  // Draw all the layers back to the canvas
  Object.values(layers).forEach(layer => ctx.drawImage(layer.canvas, 0, 0));

};