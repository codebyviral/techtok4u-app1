import mongoose from "mongoose";
import { UserType } from './usertype.model.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    userType: {
        type: mongoose.Types.ObjectId,
        ref: "UserType",
    }
});

export const User = mongoose.model("User", userSchema);
