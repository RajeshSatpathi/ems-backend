import mongoose from "mongoose"
import { Schema } from "mongoose"

const salarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', require: true },
    basicSalary: { type: Number, require: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, require: true },
    PayDate: { type: Date, require: true }

}, { timestamps: true });

export const Salary = mongoose.model('Salary', salarySchema)