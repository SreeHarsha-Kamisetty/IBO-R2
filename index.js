const express = require("express")
const cors = require("cors");
const { connection } = require("./db");
const Router = require("./routes/v1.routes");

const app = express();
app.use(express.json())
require("dotenv").config()
const PORT  = process.env.PORT || 8080

app.use("/v1",Router);
app.get("/",(req,res)=>{
    res.send("Home")
})

app.listen(8080, async()=>{
    try {
       
        await connection.authenticate();
       
        // await connection.sync({force:true})
        console.log("connected to DB")
        console.log(`Server running at port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
   
})