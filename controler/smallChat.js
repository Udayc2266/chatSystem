const Primary = require("../views/backend/primary.js");
const Secondary = require("../views/backend/secondary.js");



module.exports.postReview = async(req,res)=>{
    let {id} = req.params;
     let neuChat = await Primary.findById(id);
     
     const {message} = req.body
     let newChat = new Secondary(message);
     newChat.author = req.user;
     
     neuChat.secondary.push(newChat);
 
     await newChat.save();
     await neuChat.save();
     
     res.redirect(`/chats`)
 }

 module.exports.deleteReview = async(req,res)=>{
    const {id , reviewid} = req.params;
    await Primary.findByIdAndUpdate(id, {$pull : {secondary : reviewid}})
    await Secondary.findByIdAndDelete(reviewid);
    
    res.redirect(`/chats/${req.params.id}`);
   
}