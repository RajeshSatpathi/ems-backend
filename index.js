import express from "express";
import dotenv from "dotenv";
import { DatabaseConnection } from "./config/DB.js";
import { userRegistration } from "./UserRegistration.js";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js"
import cors from "cors"
import { DepartmentRoutes } from "./routes/DepartmentRoutes.js";
import { EmpRoutes } from "./routes/EmpRoutes.js";
import { SalaryRoutes } from "./routes/SalaryRoutes.js";
import { LeavesRoute } from "./routes/LeavesRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/Public/uploads', express.static('Public/uploads'));

// routes 
app.use("/api/auth", authRoutes);
app.use("/department", DepartmentRoutes);
app.use("/api/employee", EmpRoutes)
app.use("/api/salary", SalaryRoutes)
app.use("/api/leaves", LeavesRoute)

// Export as serverless function for Vercel
export default async function handler(req, res) {
  try {
    await DatabaseConnection(); // Ensure DB is connected
    app(req, res); // Pass request to Express app
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
}