const importer = ({ id, src }) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve({ id, image }));
    image.addEventListener('error', () => reject({ id, image: null }));
    image.src = `../assets/${src}`;
  });
};

export default (assets, onComplete) => {
  Promise.all(assets.map(importer)).then((images) => onComplete(images));
};