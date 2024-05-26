import express from 'express';
import { addDay, updateDayById, getAllDays, getDayById, deleteDayById } from '../controllers/day.controller.js';
const router = express.Router();

router.get("/", getAllDays);

router.post("/", addDay);

router.put("/:id", updateDayById);

router.get("/:id", getDayById);

router.delete("/:id", deleteDayById);

export default router;