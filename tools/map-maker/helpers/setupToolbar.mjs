export default ({ assets, onSelect }) => {
  const { slices } = assets.spriteData.meta;
  const toolbar = document.getElementById(`toolbar`);
  const types = {};

  // Sort all types by the first word
  slices.forEach(slice => {
    const type = slice.name.split(`_`)[0];

    return types[type]
      ? types[type].push(slice)
      : types[type] = [slice];
  });

  const canvasses = [];

  const html = `
  <ul>
    ${Object.entries(types).map(([type, sprites]) => `
      <li>
        <button>${type}</button>
        <ul>

          ${sprites.map(sprite => {
            const ctx = document.createElement(`canvas`).getContext(`2d`);
            const bounds = sprite.keys[0].bounds;

            ctx.width = ctx.canvas.width = bounds.w;
            ctx.height = ctx.canvas.height = bounds.h;

            ctx.drawImage(assets.spriteSheet,
              bounds.x,
              bounds.y,
              bounds.w,
              bounds.h,
              0,
              0,
              bounds.w,
              bounds.h
            );            
            
            canvasses.push({
              name: sprite.name,
              canvas: ctx.canvas,
            });

            return `<li><button title="${sprite.name.replace(/[_-]/g, ` `)}" id="${sprite.name}"></button></li>`;

          }).join(``)}

        </ul>
      </li>`
    ).join(``)}
  </ul>`;
  
  toolbar.innerHTML = html;

  canvasses.forEach(({ name, canvas }) => {
    const button = document.getElementById(`${name}`);
    button.appendChild(canvas);

    button.addEventListener(`click`, () => {
      onSelect(name);
    });

  });
};