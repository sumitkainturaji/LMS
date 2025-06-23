// import { clerkClient } from "@clerk/express"

// // Middleware ( Protect Educator Routes )
// export const protectEducator = async (req,res,next) => {

//     try {

//         const userId = req.auth.userId
        
//         const response = await clerkClient.users.getUser(userId)

//         if (response.publicMetadata.role !== 'educator') {
//             return res.json({success:false, message: 'Unauthorized Access'})
//         }
        
//         next ()

//     } catch (error) {
//         res.json({success:false, message: error.message})
//     }

// }

import { clerkClient } from "@clerk/express"


// Middleware: Check if user is logged in
export const isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Middleware ( Protect Educator Routes )
export const protectEducator = async (req,res,next) => {

    try {

        const userId = req.auth.userId
        
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'educator') {
            return res.json({success:false, message: 'Unauthorized Access'})
        }
        
        next ()

    } catch (error) {
        res.json({success:false, message: error.message})
    }

}