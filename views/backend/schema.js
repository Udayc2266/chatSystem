const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const smallchat = require("./smallschema.js")
const User = require("./user.js")
const chatlists = new Schema({
    title:{
        type :String,
        required: true
    },
    image:{
        type:String,
        default:'https://thumbs.dreamstime.com/b/close-up-view-saturn-s-rings-illuminated-vibrant-cosmic-nebula-deep-space-striking-depiction-reveals-intricate-335492966.jpg'
    },
    aims:{
        type : String,
        required:true
    },

    category:{
        type :String,
        required : true

    },
    
    date:{
        type:Date,
        default:Date.now
    },
    

    smallchats:[
        {
        type: Schema.Types.ObjectId,
        ref:"Smallchat"
    },
    ],

    owner : {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
});

chatlists.post("findOneAndDelete" , async(chat)=>{
    if(chat){
        await smallchat.deleteMany({_id:{$in :chat.smallchats}});
    };
    
});


const Chat = mongoose.model("Chat", chatlists);

module.exports= Chat;