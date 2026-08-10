
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export async function fetchAllUser(_,res){
    try {
        const users = await User.find().sort({createdAt:-1});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message:"inter server error in fetching user"});
    }
}

export async function register(req,res) 
{
 /*    try {
        const {username , password,c_password,email} = req.body;
        if(password===c_password){
            const user = new User({username,password,email});
            await user.save();
            res.status(200).json({message:"login successfull"});
        }else{
        res.status(200).json({message:"password did not match !"});
        }
    } catch (error) {
            console.log("error:",error);
    } */
    try 
    {
        const {username,password,c_password,email} = req.body;
        
        if (!username || !email || !password || !c_password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if(password!==c_password){
            res.status(400).json({message:"password did not match "});
        }

        const exsitinguser = await User.findOne({email});
        if(exsitinguser){
            res.status(409).json({message:"email alredy there "});
        }
        const Hasspass = await bcrypt.hash(password,10);

        const user = new User({username,password:Hasspass,email});
        await  user.save();
        return res.status(200).json({message:"register user  Successfully"});



    } catch (error) {
       return res.status(500).json({message:"failed to login"});
    }


}

export async function login(req,res) 
{
    try {
        const {password,email} =  req.body;

        if(!password||!email){
            return res.status(400).json({message:"provide password and email"});
        }
        
        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(409).json({message:"no valid user and email in database"});
        } 

        const passwordmatch  = await bcrypt.compare(password,user.password);

        if(!passwordmatch){
            res.status(500).json({message:"password and emial is invalid"});
        }

        const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        );

        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({message:"Login Successfully"});

    } catch (error) {
        return  res.status(500).json({message:"internal server error",error:"error"});
    }
    
}

export function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
