import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        tasks: {
            type: [ObjectId],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Day = mongoose.model("Day", DaySchema);

export default Day;