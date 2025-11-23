const express = require('express')
const { userAuth } = require('../middleware/auth')
const { validateEditProfileData } = require('../utils/validate')

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(400).send("Error: " + err)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {

        validateEditProfileData(req); // validate the input data

        const loggedInUserData = req.user; // data before updated

        Object.keys(req.body)
            .forEach(
                (data)=>loggedInUserData[data]=req.body[data])
        
        
        await loggedInUserData.save();
        // why? : becasuse i already get the instance of user from userAuth Middleware that instance i store on req.user
        res.send(`${loggedInUserData.firstName}, your profile updated sucessfully..`)
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = profileRouter;