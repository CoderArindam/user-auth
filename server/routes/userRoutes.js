import express from "express";
import {
  getNewAccessToken,
  userLogin,
  userRegistration,
} from "../controllers/userControllers.js";

const router = express.Router();

//public routes

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/refresh-token", getNewAccessToken);
export default router;
