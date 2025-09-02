import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Register User:/api/user/register
export const register=async(req ,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:'Missing Details'})
        }

        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.json({success:false,message:'User already exists'})
        }
        const hashedPasswrod=await bcrypt.hash(password,10);

        const user =await User.create({name,email,password:hashedPasswrod})

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token,{
            httpOnly:true,  //prevent javascript to acces cookie
            secure:process.env.NODE_ENV ==='production' ,//user secure cookie in production
            sameSite:process.env.NODE_ENV ==='production' ? 'none' : 'strict',//CREF protection
            maxAge:7 * 24 * 60* 60 * 1000, //Cookie expiration time
        })
        return res.json({success:true,user:{email:user.email,name:user.name}})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}



//LOgin User:/api/user/login

export const login=async(req ,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.json({sucess:false,message:"Email and Password Required"});
        }

        const user=await User.findOne({email});

        if(!user){
            return res.json({success:false,message:'Invaild email or password'});
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"inavalid email or password"});
        }

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production' ,
            sameSite:process.env.NODE_ENV ==='production' ? 'none' : 'strict',
            maxAge:7 * 24 * 60* 60 * 1000,
        })
        return res.json({success:true,user:{email:user.email,name:user.name}})
    }
    catch(error){
         console.log(error.message);
        res.josn({success:false,message:error.message});
    }
}



// Check Auth:/api/use/is-auth

// export const isAuth=async(req ,res)=>{
//     try{
//         const {userId}=req.body;
//         const user=await User.findById(userId).select("-password")
//         return res.json({success:true,user})
//     }
//     catch(error){
//         console.log(error.message);
//         res.json({success:false,message:error.message});
//     }
// }

export const isAuth = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Now from req, NOT req.body

    if (!userId) {
      return res.json({ success: false, message: "User ID missing from request" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log("isAuth error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};


//Logout User ://api/user/logout
export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secrue:process.env.NODE_ENV === "production",
            sameSite :process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        // return res.json({succes:true,message:"Logged Out"})
        return res.json({ success: true, message: "Logged Out" });

    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}