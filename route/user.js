const express = require("express");
const router = express.Router();
const wrapAsync = require("../extra/protection.js");
const User = require("../views/backend/user.js");
const ExpressError = require("../extra/ExpressError");
const passport = require("passport");
const {saveRedirect} = require("./middle.js")



router.get("/signup",(req,res)=>{
    
    res.render("main/signup.ejs");
});

router.post("/signup",
    wrapAsync(async(req,res , next)=>{

    try {
        let { name , username , password } = req.body;
        const newUser = new User({name, username});
        const userRegister = await User.register(newUser , password);
        req.login(userRegister,(err)=>{
            if(err){
              return  next(err)
            }
            req.flash("success","Welcome To ChatSystem !")
            res.redirect("/chats")
        })
        
    } catch(e) {
        req.flash("error", e.message);
    }
}));

router.get("/login",(req,res)=>{
    
    res.render("main/login.ejs");
});

router.post("/login",
    saveRedirect,
    passport.authenticate('local', { failureRedirect: '/login' , failureFlash :true }),
    wrapAsync(async(req,res)=>{
    req.flash("success","Welcome Back !")
    const redirectUrl = res.locals.redirectUrl || "/chats" ;
    res.redirect(redirectUrl)
}));

router.get("/logout",(req,res ,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash( "success" , "You are Log Out now !" )
        res.redirect("/chats")
        })
    }
)


router.get("/credit" ,(req , res , next)=>{
    res.render("main/credit.ejs")
})

router.get("/term/condition" ,(req , res , next)=>{
    res.render("main/term condition.ejs")
})

router.get("/term/condition" ,(req , res , next)=>{
    res.render("main/term condition.ejs")
})






module.exports = router;