// This file uses for configaration of environment variable
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') }); //define the .env file || But why??\

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
