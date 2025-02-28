
const Primary = require("../views/backend/primary");



module.exports.allCard = async(req,res)=>{
    const allchats = await Primary.find({});
    res.render("main/show.ejs" ,{allchats});

}

module.exports.newCard =async(req,res)=>{
    res.render("main/newChats.ejs");

}

module.exports.postNewCard = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename
    console.log(url , filename)
    const {chat } = req.body;
    const chats = new Primary(chat );
    chats.user = req.user._id;
    chats.image = {url , filename};
    await chats.save();
    req.flash("success","New listing created !")
    res.redirect("/chats");
    
}

module.exports.card  = async(req,res)=>{
    const {id}=req.params;
    const chats = await Primary.findById(id)
    .populate({path : "secondary",populate :{path:"user"}})
    .populate("user");
    console.log(res.currUser)
    res.render("main/chats.ejs",{chats });
}

module.exports.deleteCard = async(req,res)=>{
    const {id} = req.params;
    let newChat = await Primary.findById(id);
    if(!newChat.user._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
        
    }
    await Primary.findByIdAndDelete(id);
    

    const chats = await Primary.findById(id).populate("secondary");


    req.flash("success","Successfully Deleted !")


    res.redirect("/chats");
}

module.exports.editCard =  async(req,res)=>{
    const {id} = req.params;
    let newChat = await Primary.findById(id);
    if(!newChat.user._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
    const chat = await Primary.findById(id);
    res.render("main/edit.ejs",{chat});
}

module.exports.postEditCard = async(req,res)=>{
    const {id} = req.params;
    const {title , image , aims , category } =req.body.chat;
    let newChat = await Primary.findById(id);
    if(!newChat.user._id.equals(res.locals.currUser._id)){
        req.flash("error" ,"You Don't Have Permission !")
        return res.redirect(`/chats/${id}`)
    }
    
    await Primary.findByIdAndUpdate(id,{
        title , image , aims , category 
        
    });
    req.flash("success","Successfully Edited !")
    res.redirect("/chats")
}