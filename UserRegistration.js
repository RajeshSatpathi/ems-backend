import { User } from "./models/User.model.js"
import bcrypt from "bcryptjs"
export const userRegistration = async()=>{
try {
    const hashpassword = await bcrypt.hash("admin1234",10);
    const registerUser = new User({
        name:"Rajesh Satpathi",
        email:"rajesh@gmail.com",
        password:hashpassword,
        role:"admin"
    });
    await registerUser.save()
} catch (error) {
    
}
}