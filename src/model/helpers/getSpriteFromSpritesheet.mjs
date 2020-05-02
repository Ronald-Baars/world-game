export default (animation, direction, { data }, animationFrame) => {
  const { from, to } = data.meta.frameTags.find(({ name }) => name === `${animation}_${direction}`);
  const animationLength = to - from + 1;
  const correctedAnimationFrame = from + (animationFrame % animationLength);
  return data.frames[`${correctedAnimationFrame}`].frame;
};