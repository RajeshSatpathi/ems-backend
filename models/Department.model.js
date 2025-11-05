import mongoose from "mongoose"
const deptSchema = new mongoose.Schema({
    deptName: {
        type: String,
        require: true
    },
    deptDesc: {
        type: String,
    }
}, { timestamps: true });
export const Department = mongoose.model("Department", deptSchema)
