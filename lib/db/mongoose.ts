
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {

    mongoose.set('strictQuery',true)

    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is not defined')
    }

    if(isConnected){
        console.log('Using existing database connection')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to connect to database: ${error.message}`)
        }
    }
}
