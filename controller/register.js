import User from "../model/user.js";
import crypto from "crypto";
import { sendOtp } from "../utils/Sendemail.js";

export const register = async (req, res) => {
  const { email, password } = req.body; //destructure the email and password from the request body
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// generateOTP
export const generateOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User not found" }); //return is imortant to stop the execution of the function if the user is not found
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpire = new Date(Date.now() + 2 * 60 * 1000);
    userExist.otp = otp;
    userExist.otpExpire = otpExpire;
    await userExist.save();


    sendOtp(email, otp); //import
    res.status(200).json({ message: "OTP sent successfullyn" });
  } catch (error) {
    // console.log(Error.message); //log the error message to the console for debugging purposes/GET CORECT ERRORO
    console.log("readkkk", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "User not found" });
    }
    if (exist.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (exist.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    exist.otp = null;
    exist.otpExpire = null;
    await exist.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
