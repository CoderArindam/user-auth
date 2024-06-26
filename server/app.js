import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb.js";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport-jwt-strategy.js";
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
//This will fix the CORS Policy Error
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

//Database Connection
connectDb(DATABASE_URL);

//Avoid Cors Error
app.use(cors(corsOptions));

//JSON
app.use(express.json());

//cookie parser
app.use(cookieParser());

//passport

app.use(passport.initialize());
//load all routes
app.use("/api/user", userRoutes);
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
