import express from "express";
import { userController } from "../controllers/userController.js";
import { upload } from "../middleware/multer.middleware.js"
const router = express.Router();

const { addUser, addUserType } = userController;

router.post(
    "/user",
    upload.fields([
        { name: "aadharCard", maxCount: 1 },
        { name: "panCard", maxCount: 1 },
        { name: "profilePic", maxCount: 1 },
    ]),
    addUser
);
router.post("/user-type", addUserType)

export default router;