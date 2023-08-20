import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);


mongoose
    .connect(process.env.DB_STRING as string, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions).then(() => {
        console.log("Connected to MongoDB");
    })
    .then(() => {
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((err: Error) => {
        console.error(err.message);
    });

