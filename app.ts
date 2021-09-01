//app.ts


import * as express from 'express';
import * as mongoose from 'mongoose';

const app = express();

const PORT = 3000;

// THIS STRING IS THE LINK TO OUR MONGODB
const url = 'mongodb://localhost:27017/test';

// mongodb connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(result => app.listen(PORT, () => console.log(`1app running on port ${PORT}`)))
.catch(err => console.log(err));


app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

app.listen(PORT, () => console.log(`2app running on port ${PORT}`));