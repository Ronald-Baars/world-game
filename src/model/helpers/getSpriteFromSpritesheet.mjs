import log from '../../helpers/log.mjs';

export default (action, direction, { data }, animationFrame) => {
  const frame = data.meta.frameTags.find(({ name }) => name === `${action}_${direction}`);
  if (frame) {
    const { from, to } = frame;
    const animationLength = to - from + 1;
    const correctedAnimationFrame = from + (animationFrame % animationLength);
    return data.frames[`${correctedAnimationFrame}`].frame;
  } else {
    log(`Can't find sprite "${action}_${direction}"`);
    return {
      x: 0,
      y: 0
    };
  }
};