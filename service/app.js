import mongoose from "mongoose";
import cors from "cors";
import initializeRoutes from "./routers/index.js";
import express from "express";
import cookieparser from "cookie-parser";

const initialize = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,                 
        methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(cookieparser());
    app.use(express.json({ limit: '10mb' }));  
    app.use(express.urlencoded({ extended: true }));
    initializeRoutes(app);
    mongoose.connect(process.env.MONGO_CONNECTION);
}

export default initialize;
