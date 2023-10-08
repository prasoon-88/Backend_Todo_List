import { getUserByToken } from "../utils/fetures.js";


export const isAuth = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success:true,
            message:'Login First'       
        })
    }
    const user = await getUserByToken(token);
    req.user = user;
    next();
}