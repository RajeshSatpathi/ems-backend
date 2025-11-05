import mongoose, { Schema } from "mongoose";

const EmpSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    salary: { type: String, required: true },
}, { timestamps: true });

export const Employee = mongoose.model("Employee", EmpSchema)
