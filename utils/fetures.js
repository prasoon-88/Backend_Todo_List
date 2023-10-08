import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';

export const setCookie = async(res,user,message,status=200)=>{
    const token = await generateToken(user._id);
    res.status(status).cookie('token',token,{
        http:true,
        maxAge : 1000*60*15,
        sameSite : process.env.NODE_ENV  == "Development"? "lax" : "none",
        secure: process.env.NODE_ENV  == "Development"? false : true
    }).json({
        success:true,
        message
    })   
}

export const getUserByToken = async(token)=>{
    const DBID = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(DBID.id);
    return user;
}

const generateToken = async(id)=>{
    const token = jwt.sign({id:id},process.env.JWT_SECRET);
    return token;
}
