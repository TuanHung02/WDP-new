import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/database.js';
import cors from 'cors';
import { tourRouter, locationRouter, scheduleRouter, transportionRouter, userRouter, bookingRouter } from "./routes/index.js"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/tour', tourRouter)
app.use('/api/location', locationRouter)
app.use('/api/schedule', scheduleRouter)
app.use('/api/transportion', transportionRouter)
app.use('/api/user', userRouter)
app.use('/api/booking', bookingRouter)

const PORT = process.env.PORT || 9999;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});