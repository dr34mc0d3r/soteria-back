require('dotenv').config();
const express = require("express");
const cors = require("cors");
var mongoose = require('mongoose');
var morgan = require('morgan');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
// file-stream-rotator
// https://coralogix.com/blog/morgan-npm-logger-the-complete-guide/

const version = '0.0.1';


const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// move into a middleware -----------------------------------
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'node-server.logs'), { flags: 'a' });
// Create custom client IP token - workaround for docker/nginx proxy
morgan.token('clientaddr', (req, res) => {
  return req.headers['x-forwarded-for'] || req.IncomingMessage.remoteAddress;
});
// Create custom date token with proper timezone infomation - fixes logs so they are not in UTC
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});
// Build custom morgan logging format
morgan.format('myformat', ':clientaddr - :clientaddr [:date[America/Chicago]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
// setup the logger
app.use(morgan('myformat', { stream: logStream }));



// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('*******************************Database connected');
},
  error => {
    console.log("*******************************Database can't be connected: " + error);
    process.exit();
  }
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "you accessed the root route" });
});

const user = require("./routes/auth.router");
app.use("/user", user);

const test = require("./routes/test.router");
app.use("/test", test);

const static = require("./routes/static.router");
app.use("/static", static);

app.get('/version', function (req, res) {
  res.json({ version: version });
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // Express error handling
// app.use((req, res, next) => {
//   setImmediate(() => {
//       next(new Error('Something went wrong'));
//   });
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
