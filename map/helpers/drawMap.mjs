import rgbToHex from './rgbToHex.mjs';

export default (map, canvas, ctx, assets) => {

  const layers = {
    water: document.createElement(`canvas`).getContext(`2d`),
    coast: document.createElement(`canvas`).getContext(`2d`),
    southCoast: document.createElement(`canvas`).getContext(`2d`),
    land: document.createElement(`canvas`).getContext(`2d`),
    transitions: document.createElement(`canvas`).getContext(`2d`),
  };

  layers.coast.globalCompositeOperation = `destination-over`;
  layers.southCoast.globalCompositeOperation = `destination-over`;


  Object.entries(layers).forEach(([key, layer]) => {
    layer.canvas.width = canvas.width;
    layer.canvas.height = canvas.height;
    layer.canvas.id = key;
  });

  // Show the layers (only for preview)
  document.body.appendChild(layers.water.canvas);
  document.body.appendChild(layers.coast.canvas);
  document.body.appendChild(layers.southCoast.canvas);
  document.body.appendChild(layers.land.canvas);
  document.body.appendChild(layers.transitions.canvas);
    
  ctx.save();

  // // Draw the image to the canvas
  ctx.drawImage(map, 0, 0, canvas.width, canvas.height);

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
        "#91972a": `jungle`,
        "#fcdfa6": `desert`,
      };

      const pixel = {
        current: landTypes[getHexFromPosition(x, y)],
        left: landTypes[getHexFromPosition(x - 1, y)],
        right: landTypes[getHexFromPosition(x + 1, y)],
        above: landTypes[getHexFromPosition(x, y - 1)],
        below: landTypes[getHexFromPosition(x, y + 1)],
      };
        




      // FILL THE OCEANS
      if (pixel.current === `water`) {
        // TODO: const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_jungle`).keys[0].bounds;
        layers.water.fillStyle = `#2973bb`;
        layers.water.fillRect(x, y, 1, 1);
      }





      // DRAW THE NORTH, EAST AND WEST COASTS
      if (pixel.current !== `water` && pixel.above && pixel.above === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x + x % bounds.w, bounds.y, 1, bounds.h, x, y - bounds.h, 1, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.above}_top"`);
        }
      }

      if (pixel.current !== `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y + y % bounds.h, bounds.w, 1, x, y, bounds.w, 1);
        } else {
          console.error(`Can't find sprite "coast_${pixel.above}_bottom"`);
        }
      }

      if (pixel.current !== `water` && pixel.left && pixel.left === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y + y % bounds.h, bounds.w, 1, x - bounds.w, y, bounds.w, 1);
        } else {
          console.error(`Can't find sprite "coast_${pixel.above}_bottom"`);
        }
      }

      // DRAW THE DIAGONAL NORTH COASTS
      if (pixel.current !== `water` && pixel.above && pixel.above === `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top-right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y, bounds.w, bounds.h, x + 1, y - bounds.h, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_top-right"`);
        }
      }

      if (pixel.current !== `water` && pixel.above && pixel.above === `water` && pixel.left && pixel.left !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_top-left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y - bounds.h, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_top-left"`);
        }
      }

      // DRAW THE DIAGONAL SOUTH COASTS
      if (pixel.current !== `water` && pixel.below && pixel.below === `water` && pixel.right && pixel.right === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom-right`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y, bounds.w, bounds.h, x + 1, y + 1, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom-right"`);
        }
      }

      if (pixel.current !== `water` && pixel.below && pixel.below === `water` && pixel.left && pixel.left !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom-left`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.coast.drawImage(assets.map, bounds.x, bounds.y, bounds.w, bounds.h, x - bounds.w - 1, y + 1, bounds.w, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.current}_bottom-left"`);
        }
      }






      // DRAW THE SOUTH COASTS
      if (pixel.current !== `water` && pixel.below && pixel.below === `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `coast_${pixel.current}_bottom`);
        if (spriteData) {
          const { bounds } = spriteData.keys[0];
          layers.southCoast.drawImage(assets.map, bounds.x + x % bounds.w, bounds.y, 1, bounds.h, x, y + 1, 1, bounds.h);
        } else {
          console.error(`Can't find sprite "coast_${pixel.below}_bottom"`);
        }
      }




      // FILL THE LAND
      if (pixel.current !== `water`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_${pixel.current}`).keys[0].bounds;
        layers.land.drawImage(assets.map, spriteData.x + x % spriteData.w, spriteData.y + y % spriteData.h, 1, 1, x, y, 1, 1);
      }
        



      // DRAW TO THE TRANSITION LAYER
      if (pixel.current === `jungle` && pixel.below && pixel.below === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_from-jungle_vertical`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, bounds.x + x % bounds.w, bounds.y, 1, bounds.h, x, y, 1, bounds.h);
      }

      if (pixel.current === `jungle` && pixel.above && pixel.above === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_to-jungle_vertical`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, bounds.x + x % bounds.w, bounds.y, 1, bounds.h, x, y - bounds.h, 1, bounds.h);
      }

      if (pixel.current === `jungle` && pixel.right && pixel.right === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_from-jungle_horizontal`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, bounds.x, bounds.y + y % bounds.h, bounds.w, 1, x, y, bounds.w, 1);
      }

      if (pixel.current === `jungle` && pixel.left && pixel.left === `desert`) {
        const spriteData = assets.map_data.meta.slices.find(({ name }) => name === `land_to-jungle_horizontal`);
        const { bounds } = spriteData.keys[0];
        layers.transitions.drawImage(assets.map, bounds.x, bounds.y + y % bounds.h, bounds.w, 1, x - bounds.w, y, bounds.w, 1);
      }
    }
  }

  ctx.restore();

};