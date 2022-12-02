require('dotenv').config()

const express = require('express')
const authRoute = require('./auth')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())

const PORT = 5000

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("conect to mongoose")).catch(err=>console.log(err));


app.use("/api/auth",authRoute);

app.listen(process.env.PORT||PORT,(req,res)=>{
    console.log("Im listening to the PORT 5000")
})
