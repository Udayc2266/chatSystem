
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
};


const express = require('express')
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
const mongoose = require('mongoose');
const Chat = require("./views/backend/schema.js");
const Smallchat = require("./views/backend/smallschema.js");
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const isLogin = require("./route/middle.js")


app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const wrapAsync = require("./extra/protection.js");
const ExpressError = require("./extra/ExpressError");
const {chatSchema} = require("./extra/joi.js"); 

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./views/backend/user.js");
const chatsRouter = require("./route/chats.js")
const smallChatsRouter = require("./route/smallChats.js")
const userRouter = require("./route/user.js")


const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const { cookie } = require('express/lib/response.js');

const dbUrl = process.env.ATLASDB_URL

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl)
}











app.get("/",
    wrapAsync(async(req,res)=>{
    res.render("main/instruction.ejs")
}));

const store = MongoStore.create({
    mongoUrl: dbUrl ,
    crypto: {
        secret: process.env.SECRET,
      },
    touchAfter: 24 * 3600
})


store.on("error", ()=>{
    console.log("ERROR on MONGO SESSTION STORE" , err);
})


const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false ,
    saveUninitialized: false, 
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000 ,
        httpOnly : true
    }
};





app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res , next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.push = req.push
    next();
})


app.get("/chats/new" , (req, res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You Have To Login First !");
        res.redirect("/login")
    }
    res.render("main/newChats.ejs")
    }
    
)
app.use("/chats" ,chatsRouter);
app.use("/chats",smallChatsRouter);
app.use("",userRouter)






app.use((err,req,res,next)=>{
    let {status = 500 , message = " Sorry ! Something went Wrong !"} = err;
    console.log(err)
    res.status(status).render("main/error.ejs",{status,message});
})



app.listen(3000,()=>{
    console.log("SuccessFully Start");
});