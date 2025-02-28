const User = require("../views/backend/user.js");
const passport = require("passport");


module.exports.signup = async(req,res)=>{
    
    res.render("main/signup.ejs");
}

module.exports.postSignup = async(req,res , next)=>{

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
}

module.exports.login = async(req,res)=>{
    
    res.render("main/login.ejs");
}

module.exports.postLogin = async(req,res)=>{
    req.flash("success","Welcome Back !")
    const redirectUrl = res.locals.redirectUrl || "/chats" ;
    res.redirect(redirectUrl)
}

module.exports.logout = async(req,res ,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash( "success" , "You are Log Out now !" )
        res.redirect("/chats")
        })
    }


module.exports.credit = async(req , res , next)=>{
    res.render("main/credit.ejs")
}

module.exports.termCondition = async(req , res , next)=>{
    res.render("main/term condition.ejs")
}