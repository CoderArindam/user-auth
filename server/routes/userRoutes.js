import express from "express";
import UserControllers from "../controllers/userControllers.js";

const router = express.Router();

//public routes

router.post("/register", UserControllers);

export default router;
