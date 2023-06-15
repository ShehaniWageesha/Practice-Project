import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./service/user_service.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);

const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected to the database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));
