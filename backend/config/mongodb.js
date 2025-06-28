import mongoose from "mongoose"
import { configDotenv } from "dotenv";

configDotenv()
const connectDb = async () => {
    mongoose.connection.on('connected', () => {
        console.log("db connected");
    })
    await mongoose.connect(process.env.MONGODB_URL)
}

export default connectDb