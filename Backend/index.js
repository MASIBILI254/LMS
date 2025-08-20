import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { useRoutes } from './Routes/useRoutes.js';
import { bookRoutes } from './Routes/bookRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', useRoutes);
app.use('/books', bookRoutes);

// MongoDB connection
mongoose.connect(MONGO_URL).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)});