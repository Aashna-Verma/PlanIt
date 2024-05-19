import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";

import('dotenv').then(dotenv => {
  dotenv.config();

  const app = express();

  app.get("/hello", (_, res) => {
    res.send("Hello Vite + React + TypeScript!");
  });

  mongoose.connect("mongodb+srv://admin:"+ process.env.MONGODB_PASSWORD +"@planitdb.7j7rlyn.mongodb.net/?retryWrites=true&w=majority&appName=PlanItDB")
    .then(() => {
      console.log('Connected to MongoDB')
      
      ViteExpress.listen(app, 3000, () =>
        console.log("Server is listening on port 3000..."),
      );
      
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));
});
