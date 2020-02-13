const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const authrouter=require('./routes/auth/authentication')
const getdata=require('./routes/access/api')
const validatetoken=require('./routes/auth/authmiddleware')
const app=express()

app.use(cors())
app.use(bodyParser.json())
app.use('/auth',authrouter)
app.use(validatetoken)
app.use('/api',getdata)

app.listen(3333,()=>console.log("Chall gyya bava"))

