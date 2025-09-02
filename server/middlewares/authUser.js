// import jwt from "jsonwebtoken"


// const  authUser=async(req ,res,next)=>{
//     const {token} =req.cookies;

//     if(!token){
//         return res.json({success:false,message:"Not Authorized"})
//     }
    // try{
    //     const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
    //     if(tokenDecode.id){
    //         req.userId=tokenDecode.id;//change
    //     }
    //     else{
    //         return res.json({success:false,message:"Not Authorized"});
    //     }
    //     next();
    // }
    // catch(error){
    //     res.json({success:false,message:error.message});
    // }

// }


// export default authUser



import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    // 🔹 Also provide full object so controllers using req.user._id work
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
