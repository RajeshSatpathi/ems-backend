import mongoose from "mongoose";
export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongoDB Connected...")

    } catch (error) {
        console.log("DB Connection Failed...")

    }
}