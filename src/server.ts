// All type of connection will stay in this file for run server
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

// BeAMongooseMaster
// GirDHvHYRI9NSchP
async function main() {
  try {
    await mongoose.connect(config.database_url as string);


    console.log(`config port is ${config.port}`);

    app.listen(config.port, () => {
      console.log(`Project two  running successfully on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
