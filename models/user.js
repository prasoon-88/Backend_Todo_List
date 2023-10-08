import mongoose from "mongoose"

const scema = new mongoose.Schema({
    name:String,
    email:{
        type : String,
        uniqe : true
    },
    password:{
        type : String,
        select:false
    },
    createdAt:{
        type:Date,
        default : Date.now()
    }
})

export const User = mongoose.model('user',scema)

