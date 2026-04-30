const  express=require("express")
const app=express()
const PORT=3007
const cors =require("cors")
app.use(cors())
const body =require("body-parser")
app.use(body.json())
const data=require("./DB")
const Game=require("./GameRouter")
app.use("/data",Game)


app.listen(PORT,()=>{
    console.log("server is Running");
})