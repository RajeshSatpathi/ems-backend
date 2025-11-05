import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js";
import { GETsalaryApi, POSTsalaryApi } from "../controller/Salary.controller.js";
export const SalaryRoutes = express.Router();

SalaryRoutes.post('/add', verifyUser, POSTsalaryApi)
SalaryRoutes.get('/:id', verifyUser, GETsalaryApi)
