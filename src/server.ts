/* eslint-disable prefer-rest-params */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';

import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import IndexRoute from './routes/index.route';
import errorMiddleware from './middlewares/error.middleware';

import { config } from './config/app.config';
import { initializeAdmin } from './database';
import addRequestId from 'express-request-id';
import { LogOverRide } from './middlewares/log-override';

export const app = express();

Sentry.init({
  environment: config.application.environment,
  dsn: config.LOGGING.sentry_url,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

initializeAdmin();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send();
});

// if (env === 'production') {
//   app.use(morgan('combined', { stream }));
// } else if (env === 'development') {
//   app.use(morgan('dev', { stream }));
// }

app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(addRequestId());
app.use(LogOverRide);
app.use('/api', IndexRoute);
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 422 || error.status === 500 || error.status === 401) {
        return true;
      }
      return false;
    },
  }),
);
app.use(errorMiddleware);

app
  .listen(config.application.PORT, () => {
    console.log(
      'Server is running - on PORT : ' +
        config.application.PORT +
        ' in environment - ' +
        config.application.environment,
    );
  })
  .on('error', function (err) {
    console.log(err);
  });
