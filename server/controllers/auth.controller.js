import genToken  from "../config/token.js";
import User from "../models/User.model.js";



export const googleAuth = async (req, res) => {
    try {
        const {name,email} = req.body;
        let user = await User.findOne({ email });
        if(!user){
            user = new User({ name, email });
            await user.save();
        }
        let token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Google authentication failed : " + error.message });
    }
};

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed : " + error.message });
    } 
};