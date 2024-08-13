const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const User = require('../models/User');
dotenv.config();
const secretKey=process.env.POWER_KEY

const verifyToken=async(req,res,next)=>
{
    try {

        const token=req.headers.token;
        if(!token){
            return res.status(400).json({message:'token not found'})
        }
        const decode=jwt.verify(token,secretKey);
        const user=await User.findById(decode.userId)
        if(!user)
        {
            return res.status(400).json({message:'user not found'})
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

module.exports=verifyToken