import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app = express();

//parsers

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRoutes);

const a = 10;

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export { app };
