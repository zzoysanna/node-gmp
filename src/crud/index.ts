import express from 'express';
import subroutes from './routes';
import { clientErrorHandler, notFoundHandler } from './middleware';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use('/api', subroutes);

app.use(clientErrorHandler);
app.use(notFoundHandler);
