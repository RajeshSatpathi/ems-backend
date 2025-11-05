import mongoose from 'mongoose'
import { Salary } from "../models/Salary.model.js"
import { Employee } from "../models/Employee.model.js"
//add salary details api 
export const POSTsalaryApi = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances = 0, deductions = 0, PayDate } = req.body;

        const netSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)
        const newSalary = await Salary.create({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            PayDate,
            netSalary: netSalary
        })
        if (!newSalary) {
            return res.status(400).json({ success: false, message: "salary not created" })
        }
        return res.status(201).
            json({ success: true, message: "salary was added successfuly", salaryData: newSalary })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server side error...." })

    }
}
//get salary details api 
export const GETsalaryApi = async (req, res) => {
    try {
        const { id } = req.params;
        let fetchsalary = await Salary.find({ employeeId: id }).populate('employeeId');
        
        if (!fetchsalary || fetchsalary.length === 0) {
            const employee = await Employee.findOne({ userId: id });
            fetchsalary = await Salary.find({ employeeId: employee._id }).populate('employeeId')
        }
        // Return the list of employees
        res.status(200).json(fetchsalary);

    } catch (error) {
        console.error("Error fetching Salary by employee  ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}