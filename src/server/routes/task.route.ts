import express from 'express';
import { addTask, updateTaskById, getAllTasks, getTaskById, deleteTaskById } from '../controllers/task.controller.js';
const router = express.Router();

router.get("/", getAllTasks);

router.post("/", addTask);

router.put("/:id", updateTaskById);

router.get("/:id", getTaskById);

router.delete("/:id", deleteTaskById);

export default router;