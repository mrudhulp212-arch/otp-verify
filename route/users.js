import express from "express";
import {
  generateOTP,
  register,
  verifyOTP,
} from "../controller/register.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/otpgen", generateOTP);
userRouter.post("/otpverify", verifyOTP);

export default userRouter;
