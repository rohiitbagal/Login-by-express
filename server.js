import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js/db.js";
import {
  loginController,
  registerController,
} from "./controller/authController.js";
import { isAdmin, requireSignIn } from "./middlewares/authMiddleware.js";
import cors from "cors";

//config
dotenv.config();

//connect db
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is ready to serve");
});

//routes
app.post("/api/v1/auth/register", registerController);
app.post("/api/v1/auth/login", loginController);
app.get("/api/v1/auth/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
