const express = require('express')
const { userAuth } = require('../middleware/auth')

const profileRouter = express.Router()

profileRouter.post('/sentConnectionRequest', userAuth, (req, res) => {
    console.log("user sent a request");

    res.send(`${req.user.firstName} sent a connection request....`)
})

module.exports = profileRouter;