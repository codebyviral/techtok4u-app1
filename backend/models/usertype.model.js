import mongoose, { Schema } from "mongoose";

const userTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["Student", "Teacher", "Admin"], 
        default: "Student",
    }
});

export const UserType = mongoose.model("UserType", userTypeSchema);
