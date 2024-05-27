import express, { Request, Response} from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';
const app = express();

//parsers

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);


//testing
const testRoute = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', testRoute);


//global err handler
app.use(globalErrorHandler);

//Not found
app.use(notFound)

export { app };
