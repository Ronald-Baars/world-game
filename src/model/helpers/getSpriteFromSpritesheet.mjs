import log from '../../helpers/log.mjs';

export default (animation, direction, { data }, animationFrame) => {
  const frame = data.meta.frameTags.find(({ name }) => name === `${animation}_${direction}`);
  if (frame) {
    const { from, to } = frame;
    const animationLength = to - from + 1;
    const correctedAnimationFrame = from + (animationFrame % animationLength);
    return data.frames[`${correctedAnimationFrame}`].frame;
  } else {
    log(`Can't find sprite "${animation}_${direction}"`);
    return {
      x: 0,
      y: 0
    };
  }
};