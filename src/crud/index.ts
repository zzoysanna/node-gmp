import express from 'express';
import userRouter from './routes/user.routes';
import groupRouter from './routes/group.routes';
import { clientErrorHandler, notFoundHandler } from './middleware';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use('/', userRouter);
app.use('/', groupRouter);

app.use(clientErrorHandler);
app.use(notFoundHandler);
