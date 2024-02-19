import express from "express";
import {
  register,
  login,
  verify,
  forgot,
  change,
  verifyroute,
  handlerlogin,
} from "../Controllers/authController.js";

const router = express.Router();

router.post("/admin/signup", register);
router.post("/admin/login", login);
router.post("/admin/forgot", forgot);
router.get("/admin/:id/verify/:token", verify);
router.post("/admin/:id/change/:token", change);
router.get("/admin/:id/verifyroute/:token", verifyroute);

router.post("/handler/login", handlerlogin);

export default router;
