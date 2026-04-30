const mongoose=require("mongoose")

const gamecontent=new mongoose.Schema({
    Gameimage:{type:String},
    Gamename:{type:String},
    Gamedescription:{type:String},
    Gamedownload:{type:String}
})
module.exports=mongoose.model("Gam",gamecontent)