import express from "express"
import { ChangePassword, loginAPI } from "../controller/auth.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

export const authRoutes = express.Router();
authRoutes.post("/login", loginAPI)

authRoutes.get('/verify', verifyUser, (req, res) => {
    res.json({ success: true, user: req.user });
});
authRoutes.put('/changepassword/:id', verifyUser, ChangePassword)