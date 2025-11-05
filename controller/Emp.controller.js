import multer from "multer"
import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { Employee } from "../models/Employee.model.js";
import path from "path"
import { Department } from "../models/Department.model.js";
//file upload middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
export const upload = multer({ storage: storage })
// add employee code api
export const addEmpAPI = async (req, res) => {

    try {
        const {
            name,
            email,
            password,
            role,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,

        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User ALready Register" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            image: req.file ? req.file.filename : ""
        });
        if (!newUser) {
            return res.status(500).json({ success: false, message: "Employee Register failed server error" })
        }
        const savedUser = await newUser.save();
        const newEmpData = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });
        const dept = await Department.findById(department);
        if (!dept) {
            return res.status(400).json({ success: false, message: "Invalid department ID" });
        }
        await newEmpData.save();
        return res.status(201).json({ success: true, message: "Employee Register Successfully" })

    } catch (error) {
        console.error("Error in addEmpAPI:", error);
        return res.status(500).json({ success: false, message: "Employee registration failed due to a server error" });

    }
}

export const getEmpAPI = async (req, res) => {
    try {
        const data = await Employee.find().populate('userId', { password: 0 }).populate('department');
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No departments found"
            });
        }
        return res.status(200).json({ success: true, emp: data });

    } catch (error) {
        console.error("Error in EmpAPI:", error);
        return res.status(500).json({ success: false, message: "Employee Fetching  failed due to a server error" });
    }
}
export const getEmpAPIByID = async (req, res) => {
    try {
        const { id } = req.params;
        let data
        data = await Employee.findById({ _id: id }).populate('userId', { password: 0 }).populate('department');
        if (!data) {
            data = await Employee.findOne({ userId: id }).populate('userId', { password: 0 }).populate('department');

        }
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Employee  found"
            });
        }
        return res.status(200).json({ success: true, emp: data });

    } catch (error) {
        console.error("Error in employee fetching", error);
        res.status(500).json({ success: false, message: "error in Emp fetching" });

    }
}
export const EditEmpAPI = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        maritalStatus,
        designation,
        department,
        salary
    } = req.body;

    try {
        const employee = await Employee.findById(id).populate("userId");

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update the related user name (if userId exists)
        if (employee.userId) {
            employee.userId.name = name;
            await employee.userId.save();
        }
        // Update other employee fields
        employee.maritalStatus = maritalStatus;
        employee.designation = designation;
        employee.department = department;
        employee.salary = salary;

        const updatedEmp = await employee.save();

        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmp
        });
    } catch (error) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// fetch empployee based on dept ID 
export const EmpBYDeptID = async (req, res) => {
    try {
        const { id } = req.params;
        const fetchEMP = await Employee.find({ department: id });
        // Return the list of employees
        res.status(200).json(fetchEMP);

    } catch (error) {
        console.error("Error fetching employees by department ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}