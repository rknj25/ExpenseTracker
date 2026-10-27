import { user } from "../models/user.js"
export const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const extEmail=await user.findOne({email});
        if(extEmail){
            return res.json({message:"Email Already Register"});
        }
        const Nuser=await user.create({
            name:name,
            email:email,
            password:password
        })
        return res.json({message:"User register Successfully..",Nuser});
    }
    catch{
        return res.json({message:"Error in Registration"})
    }   
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const usr=await user.findOne({email});
        if(!usr){
            return res.json({message:"User not Found"})
        }
        if(password!==usr.password){
            return res.json({message:"Password not Matched"})
        }
        return res.json({message:"Login Successfully"})
    }
    catch{
        return res.json({message:"Error in Login"})
    }
}
