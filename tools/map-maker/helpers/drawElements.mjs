export default ({ ctx, elements, loadedAssets, zoom }) => {
  const spriteSheet = loadedAssets.spriteSheet;
  const sliceData = loadedAssets.spriteData.meta.slices.map(slice => ({ name: slice.name, bounds: slice.keys[slice.keys.length - 1].bounds }));

  elements.forEach((element) => {

    const slice = sliceData.find(slice => slice.name === element.spriteId);
    
    ctx.drawImage(spriteSheet,
      slice.bounds.x, 
      slice.bounds.y, 
      slice.bounds.w, 
      slice.bounds.h, 
      element.x, 
      element.y, 
      slice.bounds.w * zoom,
      slice.bounds.h * zoom
    );
  });

};