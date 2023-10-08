class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddelware = (error,req,res,next)=>{
    
    error.message = error.message || "Internal Error";
    error.statusCode = error.statusCode || 500;

    return  res.status(error.statusCode).json({
        success:false,
        message : error.message
    })
}

export default ErrorHandler;