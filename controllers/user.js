import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const loginUser = async(req,res,next)=>{
  try {
    const {email, password} = req.body;

    let user =  await User.findOne({email}).select("+password");
    if(!user) return next(new Error("Invalid Email or Password",404));
    
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched) return next(new Error("Invalid Email or Password",404));
    
    sendCookie(user, res, `welcome back ${user.name}`, 200);  
  } catch (error) {
      next(error);
  }
} 



export const createNewUser = async(req,res,next)=>{
  try {
    const{name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user) return next(new Error("user Already Exists",404));

    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({name, email, password:hashedPassword});

    sendCookie(user, res, "Registered Successfully",201);
  } catch (error) {
      next(error);
  }
}



export const getMyProfile = (req,res)=>{
  res.status(200).json({
    success:true,
    user : req.user,
  });
}



export const logoutUser = (req,res)=>{
  res
    .status(200)
    .cookie("token","",{
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development"? "lax" : "none",
      secure: process.env.NODE_ENV === "Development"? false : true,  
    })
    .json({
    success:true,
    message : "Logged Out",
  });
}



// export const updateUser = async(req,res,next)=>{
//   try {
//     const{name} = req.body;
//     let user = await User.findOne({email});

//     if(!user) return next(new ErrorHandler("User Not Found",404));
    
//     user.name = name;

//     await user.save();
//     res.status(200).json({
//       success:true,
//       message: "Profile Updated Successfully",
//     });
//   } catch (error) {
//       next(error);
//   }
// }

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    // Current logged-in user (from isAuthenticated middleware)
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // If email is being changed
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return next(new ErrorHandler("Email already in use", 400));
      }

      user.email = email;
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req,res)=>{}