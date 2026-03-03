import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

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
