import express from "express";
import { userController } from "../controllers/userController.js";
const router = express.Router();

const { addUser, addUserType } = userController;

router.post("/user", addUser)
router.post("/user-type", addUserType)

export default router;