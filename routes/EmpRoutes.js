import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js";
import { addEmpAPI, EditEmpAPI, EmpBYDeptID, getEmpAPI, getEmpAPIByID, upload } 
from "../controller/Emp.controller.js";
export const EmpRoutes = express.Router();
EmpRoutes.post("/addEmp", verifyUser, upload.single('image'), addEmpAPI);
EmpRoutes.get("/", verifyUser, getEmpAPI)
EmpRoutes.get("/:id", verifyUser, getEmpAPIByID)
EmpRoutes.put("/edit/:id", verifyUser, EditEmpAPI)
EmpRoutes.get("/department/:id", verifyUser, EmpBYDeptID)



