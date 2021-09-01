import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = global.Promise;


async function connectToDatabase(dbURL): Promise<void> {

    await mongoose.connect(dbURL, {
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
}

// const connectToDatabase = async (): Promise<void> => {
//     const dbURL = process.env.MONGODB_URL;

//     await mongoose.connect(dbURL, {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log('*******************************Database connected');
//     },
//         error => {
//             console.log("*******************************Database can't be connected: " + error);
//             process.exit();
//         }
//     );

// };

export { connectToDatabase };