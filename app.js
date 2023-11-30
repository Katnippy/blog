import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config.js';
import cors from 'cors';
import blogsRouter from './controllers/blogs.js';

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

export default app;
