const express = require('express')
const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require('../model/user')
const { validateSignupData } = require('../utils/validate')

const authRouter = express.Router();

// user signup
authRouter.post("/signup", async (req, res) => {
    try {
        const { password } = req.body;
        // Data validation
        validateSignupData(req);

        //password encryption
        const passwordHash = await bcrypt.hash(password, 10);

        // create new field on user Schema(table) 
        const user = new User({
            ...req.body,
            password: passwordHash
        })
        // save data on schema
        await user.save()
        res.send("Signup sucessfully!")
    } catch (err) {
        res.status(400).send("signup error" + err)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate email
        if (!validator.isEmail(email)) {
            throw new Error("User should enter valid email");
        }

        // Check exist or not
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("User doesn't exist")
        }

        const isValidUser = await user.verifyPassword(password)

        if (isValidUser) {
            // This best practice and make clean code
            const token = await user.getJWT();
            console.log(token)
            res.cookie("token", token, { expires: new Date(Date.now() + 8 + 360000) })
            res.send("Login sucessfully...")
        } else {
            throw new Error("Invalid credentials!!!")
        }

    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

authRouter.post("/logout", (req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("Logout sucessfully!!")
})

module.exports = authRouter;