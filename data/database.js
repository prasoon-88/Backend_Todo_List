import mongoose from "mongoose";

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:'TodoList'
    }).then(()=>{
        console.log("DB Connected")
    }).catch((error)=>{
        console.log("Error in DB")
    })    
}

export default connectToDb