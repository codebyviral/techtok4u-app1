import mongoose, { Schema } from "mongoose";

const userTypeSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        default: "student",
    }
});

export const UserType = mongoose.model("UserType", userTypeSchema);
