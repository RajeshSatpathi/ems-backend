import jwt from "jsonwebtoken"
export const generateToken = (id) => {
   const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
   return token;
}