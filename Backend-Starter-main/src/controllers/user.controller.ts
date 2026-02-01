import { Request, Response } from "express";
import User, { type IUser } from "../models/user.model.js";


export const createUser = async (req: Request, res: Response) => {
    try {
        const userData: IUser = req.body;

        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "UserId is required for update" });
        }

        const updatedUser = await User.findOneAndUpdate({ userId }, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error: any) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
}

export const getUserApplications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const jobs = await import("../models/job.model.js").then(m => m.default.find({ jobId: { $in: user.appliedJobs } }));

        res.status(200).json({ applications: jobs });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching applications", error: error.message });
    }
};

