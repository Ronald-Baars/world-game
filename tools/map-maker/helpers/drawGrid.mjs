export default ({ gridSize, width, height, ctx }) => {
  width = ctx.width = ctx.canvas.width = width * gridSize;
  height = ctx.height = ctx.canvas.height = height * gridSize;
  
  let curX = 0;
  let curY = 0;

  ctx.lineWidth = 0.5;

  // Draw lines on the X-axis
  while (curX < width - gridSize) {
    curX += gridSize;
    ctx.beginPath();
    ctx.moveTo(curX, 0);
    ctx.lineTo(curX, height);
    ctx.stroke();
  }

  // Draw lines on the Y-axis
  while (curY < height - gridSize) {
    curY += gridSize;
    ctx.beginPath();
    ctx.moveTo(0, curY);
    ctx.lineTo(width, curY);
    ctx.stroke();
  }
};