const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/mygame")
let DB=mongoose.connection

DB.on("error",(error)=>{
    console.log(error);
})
DB.once("open",()=>{
    console.log("DB connected")
})
module.exports=DB