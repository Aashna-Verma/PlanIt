import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        deadline: {
            type: Date,
            required: false,
            default: Date.now
        },
        tasks: {
            type: [ObjectId],
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;