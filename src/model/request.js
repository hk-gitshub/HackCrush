const mongoose = required("mongoose");

const connectionsRequests = mongoose.Schema({
    fromUserId : {
        type: mongoose.ObjectId()
    },

    toUserId: {
        type: mongoose.ObjectId()
    },
    status : {
        type: String,
        enum: ["intersted", "ignored"]
    }
}, {timeStamp: true})


// assign index
// assign compund index

module.exports = mongoose.model("requests", connectionsRequests)
