const importer = ([id, src]) => {
  return new Promise((resolve, reject) => {

    if (src.includes(`.png`)) {
      const image = new Image();
      image.addEventListener(`load`, () => resolve({ id, asset: image }));
      image.addEventListener(`error`, () => reject({ id, asset: null }));
      image.src = `../assets/${src}`;
    } else if (src.includes(`.json`)) {
      fetch(`../assets/${src}`)
        .then(response => response.json())
        .then(data => resolve({ id, asset: data }))
        .catch(() => reject({ id, asset: null }));
    }

  });
};

export default (assets, callback) => Promise.all(Object.entries(assets).map(importer)).then((assets) => {
  const assetList = {};

  assets.forEach(({ id, asset }) => assetList[id] = asset);

  callback(assetList);
  return;
});