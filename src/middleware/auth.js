const jwt = require("jsonwebtoken");
const User = require("../model/user")

const userAuth = async (req, res, next)=>{

    try {
        const { token } = req.cookies; // extract token

        if(!token){
            throw new Error("Token not found !!!!")
        }

        const { _id } = await jwt.verify(token, 'private-key')

        const user = await User.findById(_id)

        if(!user){
            throw new Error("User not found")
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error: "+ err.message)
    }
}


module.exports = {
    userAuth
}