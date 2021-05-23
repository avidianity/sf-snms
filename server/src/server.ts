import './shims';
import app from './app';
import { config } from 'dotenv';
config();
import db from './database';

const port = process.env.PORT;

db.then(() => app.listen(port, () => console.log(`⚡: Listening on port: ${port}`)));
