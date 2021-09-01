import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';


import { connectToDatabase } from './databaseConnection';
import { userRoute } from './routes/user.route';
// import { userRoute } from './routes/user.route';

dotenv.config();

const HOST = process.env.HOST || 'http://192.168.1.22';
const PORT = parseInt(process.env.PORT || '3000');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP logging with morgan
/*
* We first need to create a write stream, in append mode, so we don’t overwrite the old logs everytime we write  a new one.
*/
let logStream = fs.createWriteStream(path.join(__dirname, "./logs/node-server.logs"), {flags: "a"});
// setup the logger
app.use(morgan("combined", { stream: logStream }));

app.use('/', userRoute());

// app.get('/', (req, res) => {
//   return res.json({ message: 'Hello World!' });
// });

app.listen(PORT, async () => {
    await connectToDatabase(process.env.MONGODB_URL);
    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});