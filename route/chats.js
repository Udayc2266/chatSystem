const express = require("express");
const router = express.Router();

const ExpressError = require("../extra/ExpressError");

const wrapAsync = require("../extra/protection.js");
const {isLogin ,validateChat } = require("./middle.js")
const chatControler = require("../controler/chat.js")
const multer  = require('multer')
const {storage} = require("../cloudnary.js")
const upload = multer({storage })


router
    .route("")
    .get( wrapAsync(chatControler.allCard))
    .post( isLogin,  upload.single("avatar"), wrapAsync(chatControler.postNewCard));

router
    .route("/:id")
    .get( isLogin, wrapAsync(chatControler.card))
    .delete( isLogin, wrapAsync(chatControler.deleteCard))
    .put( isLogin, upload.single("avatar") ,wrapAsync(chatControler.postEditCard));
 

router.get("/new",
    isLogin,
    wrapAsync(chatControler.newCard));

router.get("/:id/edit",
    isLogin,
    wrapAsync(chatControler.editCard));



module.exports = router;