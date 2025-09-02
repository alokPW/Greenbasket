import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("Database Connecteed"));
          await mongoose.connect(`${process.env.MONOGODB_URI}/greenPlateform`)
    }
    catch(error){
        console.error(error.message);
    }
}

export default connectDB