const mongoose = require('mongoose');
const chats = requrie("./schema.js");


main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatSystem");
};

