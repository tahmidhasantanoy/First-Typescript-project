// All type of connection in this file for run server
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
// const port = 3000;

// first-project
// P67LSpomOJ3xVyeL
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Project 2  running successfully on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
