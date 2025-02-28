const express = require("express");
const router = express.Router();
const wrapAsync = require("../extra/protection.js");
const User = require("../views/backend/user.js");
const ExpressError = require("../extra/ExpressError");
const passport = require("passport");
const {saveRedirect} = require("./middle.js")
const userControler = require("../controler/user.js")



router
    .route("/signup")
    .get( wrapAsync(userControler.signup))
    .post( wrapAsync(userControler.postSignup));

router
    .route("/login")
    .get( wrapAsync(userControler.login))
    .post(saveRedirect,
        passport.authenticate('local', { failureRedirect: '/login' , failureFlash :true }),
        wrapAsync(userControler.postLogin));

router.get("/logout",wrapAsync(userControler.logout))


router.get("/credit" ,wrapAsync(userControler.credit))

router.get("/term/condition" ,wrapAsync(userControler.termCondition))




module.exports = router;