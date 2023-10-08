import bcryptjs from 'bcryptjs'
import { User } from "../models/user.js";
import { setCookie } from "../utils/fetures.js";
import ErrorHandler from '../middleware/error.js';

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Exists", 404));
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });
        setCookie(res, user, "User Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userInDb = await User.findOne({ email }).select("+password");

        if (!userInDb) {
            return next(new ErrorHandler("Incorrect Email Or Password", 404));
        }

        const match = await bcryptjs.compare(password, userInDb.password)

        if (!match) {
            return next(new ErrorHandler("Incorrect Email Or Password", 404));
        }

        setCookie(res, userInDb, `Welcome Back ${userInDb.name}`)
    } catch (error) {
        next(error)
    }
};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
};

export const logout = (req, res) => {
    res.status(200).cookie('token', null, {
        expires: new Date(Date.now()),
        sameSite : process.env.NODE_ENV  == "Development"? "lax" : "none",
        secure: process.env.NODE_ENV  == "Development"? false : true
    }).json({
        success: true,
        user: "Logout Successfully"
    })
};

