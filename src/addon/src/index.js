import express from 'express';
import { initBestTrackers } from './lib/magnetHelper.js';
import serverless from './serverless.js';

const app = express();

app.enable('trust proxy');
app.use('/knight', express.static('static', { maxAge: '1y' }));
app.use('/knight', (req, res, next) => serverless(req, res, next));
app.listen(process.env.PORT || 7000, () => {
  initBestTrackers()
      .then(() => console.log(`Started addon at: http://localhost:${process.env.PORT || 7000}`));
});
