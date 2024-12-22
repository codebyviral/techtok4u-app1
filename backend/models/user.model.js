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
    },
    aadharCard: {
        type: String,
        required: true
    },
    panCard: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }
});

export const User = mongoose.model("User", userSchema);
