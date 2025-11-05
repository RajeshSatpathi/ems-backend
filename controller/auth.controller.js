
import { generateToken } from "../config/token.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const loginAPI = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found in the DB" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch == false) {
            return res.status(400).json({ message: "incorrect password" })

        }
        //generating token and send cookie
        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        //response to front end 
        return res.status(201).json({
            success:true,
            token:token,
            user: {
                id:user._id,
                name: user.name,
                email: user.email,
                role:user.role,
                
            },
        });
    } catch (error) {
        console.error("login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



// change Password REST API CODE####

export const ChangePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // ✅ 1. Validate inputs
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ 2. Find user by ID
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ 3. Compare old password
    const isMatch = await bcrypt.compare(oldPassword, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // ✅ 4. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ 5. Save the new password
    foundUser.password = hashedPassword;
    await foundUser.save();

    // ✅ 6. Respond success
    res.status(200).json({ message: "Password updated successfully." ,data:foundUser});
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
