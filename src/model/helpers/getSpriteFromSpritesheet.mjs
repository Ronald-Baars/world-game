export default (animation, { sheet, data }, animationFrame) => {

  const { from, to } = data.meta.frameTags.find(({ name }) => name === animation);
  const animationLength = to - from + 1;
  const correctedAnimationFrame = from + (animationFrame % animationLength);
  return data.frames[`${correctedAnimationFrame}`].frame;
}