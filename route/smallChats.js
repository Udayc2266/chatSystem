const express = require("express");
const router = express.Router();
const {chatSchema} = require("../extra/joi.js"); 
const Chat = require("../views/backend/schema.js");
const Smallchat = require("../views/backend/smallschema.js");
const wrapAsync = require("../extra/protection.js");
const ExpressError = require("../extra/ExpressError");
const mongoose = require('mongoose');
const smallChatsControler = require("../controler/smallChat.js")


router.post("/:id/reviews",
    wrapAsync(smallChatsControler.postReview));

router.delete("/:id/reviews/:reviewid",
    wrapAsync(smallChatsControler.deleteReview));


module.exports = router;