const toHex = (rgb) => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = `0` + hex;
  return hex;
};

export default ({ r, g, b, a }) => a && `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
