// All type of connection will stay in this file for run server
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
// const port = 3000;

// BeAMongooseMaster
// GirDHvHYRI9NSchP
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Project two  running successfully on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
