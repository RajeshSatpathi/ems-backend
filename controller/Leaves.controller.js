import { Employee } from "../models/Employee.model.js";
import { Leaves } from "../models/Leaves.model.js";


// post leaves REST API CODE 

export const PostLeaves = async (req, res) => {
    try {
        const { userId, leaveType, FromDate, ToDate, Description } = req.body;
        const employee = await Employee.findOne({ userId });
        if (employee) {
            const leavesApply = await Leaves.create({
                employeeId: employee._id,
                leaveType,
                FromDate, ToDate, Description
            });
            if (!leavesApply) {
                return res.status(400).json({ success: false, message: "client side error" })

            }
            return res.status(201).json({ success: true, data: leavesApply })

        }

    } catch (error) {
        console.log("server error", error);
        return res.status(500).json({ success: false, message: "Server side error" })
    }
}

//get leaves REST API Code 

export const getLeavesAPI = async (req, res) => {
    try {
        const data = await Leaves.find().populate({
            path: 'employeeId',
            populate: [
                {
                    path: 'department',
                    Select: 'deptName'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        });

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No  Leaves Apply"
            });
        }
        return res.status(200).json({ success: true, leaves: data });

    } catch (error) {
        console.error("Error in Leaves ", error);
        res.status(500).json({ success: false, message: "error in Leaves fetching" });
    }
}

export const getLeavesAPIByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Leaves.findById(id).populate({
            path: 'employeeId',
            populate: [
                {
                    path: 'department',
                    Select: 'deptName'
                },
                {
                    path: 'userId',
                    select: 'name image'
                }
            ]
        });

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No  Leaves Apply"
            });
        }
        return res.status(200).json({ success: true, leaves: data });

    } catch (error) {
        console.error("Error in Leaves ", error);
        res.status(500).json({ success: false, message: "error in Leaves fetching" });
    }
}

//update leaves based on status for admin site

export const UpdateLeavesByStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedLeaves = await Leaves.findByIdAndUpdate({ _id: id }, { status: req.body.status });
        if (!updatedLeaves) {
            return res.status(400).json({ message: "leaves Details not found" })
        }
        return res.status(200).json({ success: true, message: "Leaves Status Update successfull.." })
    } catch (error) {
        console.error("Error in Leave status Update ", error);
        res.status(500).json({ success: false, message: "error in Leaves status Updating" });
    }
}