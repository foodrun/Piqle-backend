import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';

import IndexRoute from './routes/index.route';
import errorMiddleware from './middlewares/error.middleware';
import { stream } from './utils/logger';
import { config } from './config/app.config';

export const app = express();

const env = config.application.environment;

if (env === 'production') {
  app.use(morgan('combined', { stream }));
} else if (env === 'development') {
  app.use(morgan('dev', { stream }));
}

app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes go here
app.use('/api', IndexRoute);

app.use(errorMiddleware);

app.listen(config.application.PORT, () => {
  console.log('Express Server is running on Port ' + config.application.PORT);
});
