import express from "express";
import { userController } from "../controllers/userController.js";
const router = express.Router();

const addUser = userController.addUser;

router.post("/user", addUser)


export default router;