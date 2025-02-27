const express = require("express");
const router = express.Router();
const {chatSchema} = require("../extra/joi.js"); 
const Chat = require("../views/backend/schema.js");
const Smallchat = require("../views/backend/smallschema.js");
const wrapAsync = require("../extra/protection.js");
const ExpressError = require("../extra/ExpressError");
const mongoose = require('mongoose');



router.post("/:id/reviews",
    wrapAsync(async(req,res)=>{
   let {id} = req.params;
    let neuChat = await Chat.findById(id);
    console.log(req.params)
    console.log(req.body)
    console.log(neuChat)
    const {message} = req.body.small
    let newChat = new Smallchat(message);
    newChat.author = req.user._id;

    
    neuChat.smallchats.push(newChat);

    await newChat.save();
    await neuChat.save();
    
    res.redirect(`/chats`)
}));

router.delete("/:id/reviews/:reviewid",
    wrapAsync( async(req,res)=>{
    const {id , reviewid} = req.params;
    await Chat.findByIdAndUpdate(id, {$pull : {smallchats : reviewid}})
    await Smallchat.findByIdAndDelete(reviewid);
    
    res.redirect(`/chats/${req.params.id}`);
   
}));


module.exports = router;