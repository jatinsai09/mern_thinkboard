import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
}));
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use(express.json()); // Middleware to parse JSON request bodies


app.use("/api/notes", notesRoutes)

// What is an Endpoint?
// An endpoint is a combination of a URL + HTTP method that lets the 
// client interact with a specific resource

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});



// mongodb+srv://jatinsai09:JatinSaiS60@cluster0.xdhgxq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0