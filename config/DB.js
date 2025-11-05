// import mongoose from "mongoose";
// export const DatabaseConnection = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI,{
//           useNewUrlParser:true,
//           useUnifiedTopology:true
//         })
//         console.log("mongoDB Connected...")

//     } catch (error) {
//         console.log("DB Connection Failed...")

//     }
// }
// config/DB.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function DatabaseConnection() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("Please define the MONGO_URI environment variable inside .env");
    }

    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

