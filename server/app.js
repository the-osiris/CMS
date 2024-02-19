import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import eventRoute from "./Routes/event.js";
import userRoute from "./Routes/user.js";
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is Working..");
});

//database Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Database is Connected");
  } catch (error) {
    console.log(error);
  }
};

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  connectDB();
  console.log("Server is Running on Port " + port);
});
