import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import taskRoute from "./routes/task.route.js";
import dayRoute from "./routes/day.route.js";
import dotenv from "dotenv";

dotenv.config();

// middlewhere
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/tasks", taskRoute);
app.use("/api/days", dayRoute);

mongoose
	.connect(
		"mongodb+srv://admin:" +
			process.env.MONGODB_PASSWORD +
			"@planitdb.7j7rlyn.mongodb.net/?retryWrites=true&w=majority&appName=PlanItDB"
	)
	.then(() => {
		console.log("Connected to MongoDB");
		ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
	})
	.catch((err) => console.error("Failed to connect to MongoDB", err));
