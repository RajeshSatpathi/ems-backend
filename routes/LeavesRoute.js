import express from "express"
import { verifyUser } from "../middleware/authMiddleware.js";
import { getLeavesAPI, getLeavesAPIByID, PostLeaves, UpdateLeavesByStatus } from "../controller/Leaves.controller.js";

export const LeavesRoute = express.Router();

LeavesRoute.post('/add', verifyUser, PostLeaves);
LeavesRoute.get('/', verifyUser, getLeavesAPI)
LeavesRoute.get('/:id', verifyUser, getLeavesAPIByID)
LeavesRoute.put('/permision/:id', verifyUser, UpdateLeavesByStatus)




