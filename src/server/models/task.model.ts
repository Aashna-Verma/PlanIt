import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        duration: {
            type: Number,
            required: false
        },
        deadline: {
            type: Date,
            required: false,
            default: Date.now
        },
        isEvent: {
            type: Boolean,
            required: false,
            default: false
        },
        status: {
            type: String,
            required: false
        },
        repeat: {
            type: String,
            required: false
        },
        project: {
            type: ObjectId,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;