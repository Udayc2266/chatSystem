
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")

const Secondary = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true 
    },

    message : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        default : Date.now
    }


})

module.exports = mongoose.model('Secondary', Secondary);


