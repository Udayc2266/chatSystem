const Chat = require("../views/backend/schema")
module.exports.isLogin = (req, res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You Have To Login First !");
        res.redirect("/login")
    }
    next()
}



module.exports.saveRedirect = (req , res , next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner = async(req , res , next)=>{
    const {id} = req.params;
    let newChat = await Chat.findById(id);
    if(!newChat.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
}