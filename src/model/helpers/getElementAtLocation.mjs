// Returns elements that are at a certain coordinate
export default (x, y, elements) => elements.filter(element =>
  element.positionX < x &&
  element.positionX + element.width > x &&
  element.positionY < y &&
  element.positionY + element.height > y
);