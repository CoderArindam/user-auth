import express from "express";
import {
  getNewAccessToken,
  loggedUser,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/userControllers.js";
import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";

const router = express.Router();

//public routes

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/refresh-token", getNewAccessToken);

// Protected Routes
router.get(
  "/profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  loggedUser
);
router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  userLogout
);
export default router;
