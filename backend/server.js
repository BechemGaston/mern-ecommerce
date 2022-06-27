import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import data from './data.js';
import seedRouter from './routes/seedroutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("Connected to Db")
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
});



app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);



app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})


const port = 5000;
app.listen(port, () => {
    connect();
    console.log(`server running on http://localhost:${port}`)
})