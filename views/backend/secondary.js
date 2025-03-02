const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secondList = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    message : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        default : Date.now()
    }


})

const Secondary = mongoose.model('Secondary', secondList);

module.exports = Secondary
