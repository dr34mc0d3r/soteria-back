const express = require('express');
var cors = require('cors');

const intakesRoute = require('./routes/intakes');
const userRoute = require('./routes/user');
const commentsRoute = require('./routes/comments');
const imageRoute = require('./routes/images');

const app = express();

app.use(express.json()); 
// app.use(express.urlencoded());

app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use("/intakes", intakesRoute);
app.use("/user", userRoute);
app.use("/comments", commentsRoute);
app.use("/images", imageRoute);

module.exports = app;
