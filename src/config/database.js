 const mongoose = require("mongoose");

 const connectDB = async () => {
    await mongoose.connect('mongodb+srv://HK_db_user:hkpass26@hardikmdb.ldpkyaw.mongodb.net/hackCrush')
}

module.exports = {
    connectDB
}