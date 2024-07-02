import express, { RequestHandler } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app = express();

//parsers
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
// application routes
app.use('/api/v1', router);

//testing
const testRoute: RequestHandler = async (req, res) => {
  res.send('Hello World!');
};

app.get('/', testRoute);

//global err handler
app.use(globalErrorHandler);

//Not found
app.use(notFound);

export { app };
