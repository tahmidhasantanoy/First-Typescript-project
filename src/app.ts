import express, { Express /*  Request, Response */ } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app: Express = express();

//parser
app.use(express.json()); //for reading json() data
app.use(cors());

// application port
app.use('/api/v1/students', studentRoutes);

// app.get('/', (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// });

// app.listen(port, () => {
//   console.log("Project 2  running successfully");
// });

//app.listen() is in another file for file system

export default app;
