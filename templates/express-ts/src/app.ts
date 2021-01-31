import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
routes(app);

app.listen(async () => {
  // eslint-disable-next-line
  console.log(`Service running on port ${port}`);
});
