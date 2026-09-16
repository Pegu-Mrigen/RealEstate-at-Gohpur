import mongoose from "mongoose"

export const connectDB= async()=>{
   await mongoose.connect("mongodb+srv://Appun26:Appun26@cluster0.nsdvijk.mongodb.net/realestateplateform").then(()=>{
    console.log("DB Connected!")
   })
}

 