import express from 'express';
import subroutes from './routes';
import { clientErrorHandler } from './middleware';
import logger from './utils/logger';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

app.use('/api', subroutes);
app.use(clientErrorHandler);


process.on('uncaughtException', (error, source) => {
  logger.error(`Uncaught Exception: ${error} at ${source}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled rejection at ${promise}, reason: ${reason}`)
  process.exit(1)
})
