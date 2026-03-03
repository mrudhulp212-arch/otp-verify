import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./route/users";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// app.use('/api/users', userRouter);





const port = process.env.PORT || 3000;
const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};
DB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
