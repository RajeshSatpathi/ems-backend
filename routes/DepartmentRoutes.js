import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js";
import { CrateDepartmentAPI,editDepartmentAPI,getDepartmentAPI, getDepartmentByID } from "../controller/Department.controller.js";

export const DepartmentRoutes = express.Router();
DepartmentRoutes.post("/addDepartment",verifyUser,CrateDepartmentAPI);
DepartmentRoutes.get("/",getDepartmentAPI);
DepartmentRoutes.get("/:id",verifyUser,getDepartmentByID);

DepartmentRoutes.put("/edit/:id",verifyUser,editDepartmentAPI);
