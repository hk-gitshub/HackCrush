const express = require("express");

const app = express();

app.use("/", (req, res)=>{
    res.send("Hellow world")
})

app.listen(7777, () => console.log("Server is running"));