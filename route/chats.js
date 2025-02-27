const express = require("express");
const router = express.Router();
const {chatSchema} = require("../extra/joi.js"); 
const ExpressError = require("../extra/ExpressError");
const Chat = require("../views/backend/schema.js");
const wrapAsync = require("../extra/protection.js");
const {isLogin ,isOwner } = require("./middle.js")

const validateChat =(req, res, next)=>{
    let {error} = chatSchema.validate(req.params);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404,errMsg)
    }else{
        next();
    }

}




router.get("",
    wrapAsync(async(req,res)=>{
    const allchats = await Chat.find({});
    res.render("main/show.ejs" ,{allchats});

}));

router.get("/newchats",
    isLogin,
    wrapAsync(async(req,res)=>{
    res.render("main/newChats.ejs");

}));

router.post("",
    isLogin,
    validateChat,
    wrapAsync(async(req,res)=>{
    const {chat} = req.body;
    const chats = new Chat(chat);
    chats.owner = req.user._id;
    await chats.save();
    req.flash("success","New listing created !")
    res.redirect("/chats");
    
}));

router.get("/:id",
    isLogin,
    wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const chats = await Chat.findById(id)
    .populate({path : "smallchats",populate :{path:"author"}})
    .populate("owner");
    res.render("main/chats.ejs",{chats });
}));

                                                                            
 


router.delete("/:id",
    isLogin,
    
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    let newChat = await Chat.findById(id);
    if(!newChat.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
        
    }
    await Chat.findByIdAndDelete(id);
    

    const chats = await Chat.findById(id).populate("smallchats");


    req.flash("success","Successfully Deleted !")


    res.redirect("/chats");
}));


router.get("/:id/edit",
    isLogin,
    
    wrapAsync( async(req,res)=>{
    const {id} = req.params;
    let newChat = await Chat.findById(id);
    if(!newChat.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
    const chat = await Chat.findById(id);
    res.render("main/edit.ejs",{chat});
}));

router.put("/:id",
    isLogin,
    
    
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const {title , image , aims , category } =req.body.chat;
    let newChat = await Chat.findById(id);
    if(!newChat.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
    
    await Chat.findByIdAndUpdate(id,{
        title , image , aims , category 
        
    });
    req.flash("success","Successfully Edited !")
    res.redirect("/chats")
}));

module.exports = router;