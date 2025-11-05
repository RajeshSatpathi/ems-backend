import mongoose from "mongoose"
import { Schema } from "mongoose"

const LeavesSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", require: true },
    leaveType: {
        type: String,
        require: true,
        enum: ["Sick Leaves", "Casual Leaves", "Annual Leaves"],

    },
    FromDate: { type: Date, require: true },
    ToDate: { type: Date, require: true },
    ToDate: { type: Date, require: true },
    Description: { type: String },
    status: {
        type: String,
        enum: ["pending", "success", "reject"],
        default: "pending"
    }
},{timestamps:true});

export const Leaves = mongoose.model("Leaves",LeavesSchema)