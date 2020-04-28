let log;
// If we're in node, use chalk
if (typeof process !== 'undefined') {
  const chalk = require('chalk');

  // Create a time string like "14:56:04"
  const time = () => {
    const t = new Date();
    return `${('0' + t.getHours()).slice(-2)}:${('0' + t.getMinutes()).slice(-2)}:${('0' + t.getSeconds()).slice(-2)}`;
  };

  // Create a date string like "Apr 5"
  const date = () => {
    const t = new Date();
    return `${(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][t.getMonth()])} ${('0' + t.getDate()).slice(-2)}`;
  };

  log = (style, ...input) => {
    if (style === false) {
      // When false is given, clear the console
      console.clear();
      return;
    } else if (input.length === 0) {
      // If no style is given, log the first parameter
      console.info(style);
      return;
    }

    // If multiple parameters are given, style the thing
    let curStyle = chalk;
    style.split(',').forEach((el) => { curStyle = curStyle[el]; });

    // Send it to the console
    console.info(curStyle(input.join(' ').replace('{time}', time()).replace('{date}', date())));
  };
} else {
  log = (...input) => console.log(`%c🚀 ${input.join('\n\r📎 ')}`, `color: rgb(29, 169, 213); font-size: 13px; font-family: 'Operator Mono Lig', 'Fira Code', Menlo, Monaco, 'Courier New', monospace;`);
}

export default log;