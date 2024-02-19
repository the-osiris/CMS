import express from "express";
import {
  isAdmin,
  isHandler,
  findParticipant,
  updataReciever,
  findReciever,
  getCurrentData,
  getDataForAdmin,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/isAdmin", isAdmin);
router.post("/isHandler", isHandler);
router.post("/findParticipant", findParticipant);
router.post("/updateReciever", updataReciever);
router.post("/findReciever", findReciever);
router.post("/getCurrentData", getCurrentData);
router.post("/getDataForAdmin", getDataForAdmin);

export default router;
