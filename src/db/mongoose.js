import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

export default function connectDB () {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGODB_ATLAS_URI).then(
        () => { 
            console.log("MongoDB Atlas Connected.")
        },
        err => { 
            console.log(err)
        }
    );
}
