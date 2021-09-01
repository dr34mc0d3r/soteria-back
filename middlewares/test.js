const morgan = require('morgan');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');


function logger(req, res, next) {
    console.log('________________________', path.join(__dirname, '../logs', 'node-server.logs'));
    const logStream = fs.createWriteStream(path.join(__dirname, '../logs', 'node-server.logs'), { flags: 'a' });
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

    req.app.use(morgan('myformat', { stream: logStream }));
    return next();

}

module.exports = logger;