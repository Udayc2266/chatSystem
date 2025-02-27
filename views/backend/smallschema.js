const { type } = require("express/lib/response");
const { date } = require("joi");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const chatlisting = new Schema({
    message: {
        type: String,
        required: true
    },

    // author: {
    //     type: String,
    //      ref: "User",
    //     required: true
    //  },
   
    
    date: {
        type: Date,
        default: Date.now
    }
});

const Smallchat = mongoose.model("Smallchat", chatlisting); 

module.exports = Smallchat;