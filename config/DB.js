import mongoose from "mongoose";
export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
          useNewUrlParser:true,
          useUnifiedTopology:true
        })
        console.log("mongoDB Connected...")

    } catch (error) {
        console.log("DB Connection Failed...")

    }
}
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("⚠️ Missing MONGODB_URI environment variable");
// }

// let cached = global.mongoose;
// if (!cached) cached = global.mongoose = { conn: null, promise: null };

// async function dbConnect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         bufferCommands: false,
//         serverSelectionTimeoutMS: 10000,
//       })
//       .then((mongoose) => {
//         console.log("✅ MongoDB connected");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("❌ MongoDB connection error:", err.message);
//         throw err;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default DatabaseConnection;
