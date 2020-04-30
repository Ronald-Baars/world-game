const importer = ([id, src]) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve({ id, image }));
    image.addEventListener('error', () => reject({ id, image: null }));
    image.src = `../assets/${src}`;
  });
};

export default (assets, callback) => Promise.all(Object.entries(assets).map(importer)).then((images) => {
  const imageList = {};

  images.forEach(({ id, image }) => imageList[id] = image);

  callback(imageList);
  return;
});