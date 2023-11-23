import express, { Express } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

// app.listen(port, () => {
//   console.log("Project 2  running successfully");
// });

//app.listen() is in another file for file system

export default app;
