const express=require("express")
const router=express.Router()
const Gamecon=require("./GameController")

router.post("/adddata",Gamecon.Gamedata)
router.post("/view",Gamecon.viewgame)
router.post("/look",Gamecon.see)
router.post("/findg",Gamecon.findGame)
router.post("/Gametwo",Gamecon.two)
router.post("/gameerase",Gamecon.erase)
router.post("/gameupdate",Gamecon.upgame)
module.exports=router