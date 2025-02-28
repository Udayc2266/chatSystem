const Primary = require("../views/backend/primary");
const chatSchema = require("../extra/joi")
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
    let newChat = await Primary.findById(id);
    if(!newChat.user._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
}

module.exports.validateChat = (req, res, next)=>{
    let {error} = chatSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404,errMsg)
    }else{
        next();
    }

}