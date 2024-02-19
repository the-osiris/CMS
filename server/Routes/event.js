import express from "express";
import {
  create,
  getEvents,
  getUniqueName,
  getUniqueHandler,
  deleteEvent,
} from "../Controllers/eventController.js";

const router = express.Router();

router.post("/create", create);
router.post("/getEvents", getEvents);
router.post("/getUniqueName", getUniqueName);
router.post("/getUniqueHandler", getUniqueHandler);
router.post("/delete", deleteEvent);

export default router;
