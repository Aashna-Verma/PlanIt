import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
    {
        _id: {
            type: Date,
            required: true,
            unique: true
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