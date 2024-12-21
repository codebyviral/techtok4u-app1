import express from "express";
import { userController } from "../controllers/userController.js";

const { getAllUsers, getAllTypes } = userController;

const router = express.Router();

router.get("/all-users", getAllUsers);
router.get("/all-types", getAllTypes);

export default router;
