import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";
import mongoose from "mongoose";

//verify user Authorization cheaking code //////
export const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false,
                 error: "Authorization header missing or malformed" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded || !decoded.id) {
            // console.log(decoded)
            return res.status(401).json({ success: false,
                 error: "Invalid token payload" });
        }

        // ✅ Check if _id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
            return res.status(400).json({ success: false, 
                error: "Invalid user ID in token" });
        }

        // ✅ CORRECT USAGE: Pass the ID directly
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("verifyUser middleware error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, error: "Token expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, error: "Invalid token" });
        }

        return res.status(500).json({ success: false, error: "Server error" });
    }
};