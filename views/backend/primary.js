const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Secondary = require("./secondary")

const listPrime = Schema({
    title : {
        type : String,
        required : true
    },

    aims : {
        type : String,
        required : true
    },

    image : {
       url : String,
       filename : String
    },

    category : {
        type : String,
        required : true
    },

    secondary :{
        type : Schema.Types.ObjectId,
        ref : "Secondary"
    },

    user : {
        type : Schema.Types.ObjectId,
        ref :"User"
    },

    date: {
        type :Date,
        default : Date.now
    }
})


listPrime.post("findOneAndDelete" , async(primary)=>{
    if(primary){
        await Secondary.deleteMany({_id:{$in :primary.secondary}});
    };
    
});


const Primary = mongoose.model('Primary', listPrime);


module.exports = Primary

