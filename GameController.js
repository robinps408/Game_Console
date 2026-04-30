const GameSchema = require("./GameSchema")

const Gamedata = ((req, res) => {
    let user = new GameSchema({
        Gameimage: req.body.Gameimage,
        Gamename: req.body.Gamename,
        Gamedescription: req.body.Gamedescription,
        Gamedownload: req.body.Gamedownload
    })
    user.save()
        .then((result) => {
            res.json({
                data: result
            })
        })
        .catch((error) => {
            res.json({
                data: error
            })
        })
})
const viewgame=((req,res)=>{
    GameSchema.find()
    .then((result)=>{
        res.json({
            data:result
        })
    })
    .catch((error)=>{
        res.json({
            data:error
        })
    })
})

const see = ((req,res)=>{
    GameSchema.find({Gameimage: req.body.Gameimage,
        Gamename: req.body.Gamename,
        Gamedescription: req.body.Gamedescription,
        Gamedownload: req.body.Gamedownload})
        .then((result)=>{
            res.json({
                data:result
            })
        })
        .catch((error)=>{
            res.json({
                data:error
            })
        })
})

const Gdata=((req,res)=>{
    GameSchema.find({_id:req.body.id})
    .then((result)=>{
        res.json({
            data:result
        })
    })
    .catch((error)=>{
     res.json({
        data:error
     })
    })
})
const findGame =((req,res)=>{
    GameSchema.findOne({Gameimage: req.body.Gameimage,
        Gamename: req.body.Gamename,
        Gamedescription: req.body.Gamedescription,
        Gamedownload: req.body.Gamedownload})
        .then((result)=>{
            res.json({
                data:result
            })
        })
        .catch((error)=>{
            res.json({
                data:error
            })
        })
})
const two = ((req,res)=>{
    GameSchema.findById({_id:req.body.id})
    .then((result)=>{
        res.json({
            data:result
        })
    })
    .catch((error)=>{
        res.json({
            data:error
        })
    })
})

const erase = ((req, res) => {
    // Corrected res.body.id to req.body.id
    GameSchema.findByIdAndDelete({ _id: req.body.id })
        .then((result) => {
            res.json({
                data: result
            })
        })
        .catch((error) => {
            res.json({
                data: error
            })
        })
})

const upgame=((req,res)=>{
    GameSchema.findByIdAndUpdate({_id:req.body.id},{Gameimage: req.body.Gameimage,
        Gamename: req.body.Gamename,
        Gamedescription: req.body.Gamedescription,
        Gamedownload: req.body.Gamedownload},{new:true})
        .then((result)=>{
            res.json({
                data:result
            })
        })
        .catch((error)=>{
            res.json({
                data:error
            })
        })

})



module.exports = { Gamedata,viewgame,see,findGame,two,erase, upgame}