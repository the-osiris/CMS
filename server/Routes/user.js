import express from "express";
import {
  isAdmin,
  isUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/isAdmin", isAdmin);
router.post("/isUser", isUser);


export default router;
