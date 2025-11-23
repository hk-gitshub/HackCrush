const express = require("express");
const { connectDB } = require("./config/database")
const cookieParser = require("cookie-parser") 

const app = express();

const authRouter = require('./router/auth');
const profileRouter = require('./router/profile');
const requestRouter = require('./router/request')

// using this middleware convert data json to object
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
    .then(() => {
        console.log("Database connection established...")
        app.listen(7777, () => console.log("Server is running on 7777...."));
    })
    .catch((err) => {
        console.error("Database can not be connected", err)
    })



// practice purpose sample
// Get user by emailid
// app.get("/user", async (req, res) => {

//     const userEmail = req?.body?.email ?? req?.query?.email;

//     try {
//         const user = await User.findOne({ email: userEmail })
//         if (user) {
//             res.send(user)
//         } else {
//             res.status(404).send("user not found!")
//         }
//         // const users = await User.find({email: userEmail})
//         // if(users.length > 0){
//         //     res.send(users)
//         // }else{
//         //     res.status(404).send("user not found");
//         // }

//     } catch (err) {
//         res.status(400).send("Somthing went wrong", err);
//     }
// })

// // Get all users data
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({})
//         if (users.length > 0) {
//             res.send(users)
//         } else {
//             res.status(404).send("user not found");
//         }
//     } catch (err) {
//         res.status(400).send("Somthing went wrong", err);
//     }
// })

// // delete user from model
// app.delete("/user", async (req, res) => {
//     const userId = req?.query?.userId || req?.body?.userId;
//     console.log("qwerty:", userId)

//     try {
//         const user = await User.findByIdAndDelete(userId) // return the deleted user data

//         console.log("user delete", user)
//         res.send("user deleted sucessfully..")
//     } catch (err) {
//         console.error("Somthing went wrong", err);
//         res.status(400).send("Somthing went wrong")
//     }
// })

// app.patch("/updateUser/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const userData = req.body
//     console.log("userData", userData);

//     try {

//         //API Validation
//         // Appliying allowed fields
//         const ALLOWED_UPDATES = ["lastName", "age", "gender", "about", "skills", "photoUrl"]

//         const isAllow = Object.keys(userData)
//             .every((key) =>
//                 ALLOWED_UPDATES.includes(key))

//         console.log("rtyui",isAllow)
//         if(!isAllow){
//             throw new Error("Update can not allow.")
//         }

//         // validation for skills
//         if(userData?.skills.length > 15){
//             throw new Error("can not add skills more than 15")
//         }

//         // Updated data using userId
//         // const updateduser = await User.findByIdAndUpdate(userData.userId, {firstName: userData.firstName, age: userData.age})
//         const updateduser = await User.findByIdAndUpdate(userId, userData, {
//             returnDocument: "before",
//             runValidators: true
//         })


//         console.log("updated user", updateduser)
//         if (!updateduser) {
//             res.status(404).send("data not updated")
//         } else {
//             res.send("user data updated")
//         }

//     } catch (err) {
//         res.status(400).send("Somthing went wrong " + err)
//     }
// })
