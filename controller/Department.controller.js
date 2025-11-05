import { Department } from "../models/Department.model.js";

//  this is department REST API ALL Functionality Code //////////////////
////////////////////////////////////////////////////////////////////////
//create  department api 
export const CrateDepartmentAPI = async (req, res) => {
    try {
        const { deptName, deptDesc } = req.body;

        const NewDept = new Department({
            deptName,
            deptDesc
        });
        await NewDept.save();
        return res.status(200).json({ success: true, dept: NewDept });

    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ success: false, message: "error in department creation" });
    }
}
// fetch department api code
export const getDepartmentAPI = async (req, res) => {
    try {
        const data = await Department.find();

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No departments found"
            });
        }
        return res.status(200).json({ success: true, dept: data });

    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ success: false, message: "error in department fetching" });
    }
}
//get data by ID 
export const getDepartmentByID = async (req, res) => {
    try {
        const {id} = req.params;

        const data = await Department.findById(id);

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No departments found"
            });
        }
        return res.status(200).json({ success: true, dept: data });

    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ success: false, message: "error in department fetching" });
    }
}
//edit department API code 
export const editDepartmentAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const { deptName, deptDesc } = req.body;
        if (!deptName || !deptDesc) {
            return res.status(400).json({ success: false, message: "Both fields are required" });
        }
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { deptName, deptDesc },
            { new: true, runValidators: true }
        );
        if (!updatedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, message: "Department updated", dept: updatedDepartment });


    } catch (error) {
        console.error("Error updating department:", error);
        return res.status(500).json({ success: false, message: "Server error while updating department" });
    }
}

// delete API Code 
