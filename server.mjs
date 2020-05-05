import express from 'express';
import log from './src/helpers/log.mjs';

const app = express();
const port = 3000;

log(false);
log(`cyan,bold`, `⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽\n                     🚀 Game initialized - {date}, {time}\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾`);

// Serve public files
app.use(`/assets`, express.static(`${__dirname}/assets/`));
app.use(`/vendor`, express.static(`${__dirname}/vendor/`));
app.use(`/src`, express.static(`${__dirname}/src/`));
app.use(`/map`, express.static(`${__dirname}/map/`));

// Send index.html
app.get(`/`, (req, res) => res.sendFile(`${__dirname}/src/index.html`));
app.get(`/map`, (req, res) => res.sendFile(`${__dirname}/map/index.html`));

// Clear the console and log the init text
app.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
});
