import User from "../models/user.model.js";

// TODO: Add the following functions to the user.controller.ts file
const loginUser = async (req: any, res: any) => {
    try {
        
        res.status(200).json({message: "Login successful"});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}