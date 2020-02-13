const router=require('express').Router()
const User=require('../connection').Todo
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const config=require('../../config')


router.post("/register",async (req,res,next)=>{
    try{
        console.log("Chalo use banaye")
        const data=req.body
        const passhash=await bcrypt.hash(data.pass,8)
        console.log("Hash ho gyaa",passhash)
        const newus=new User({
              name:data.name,
              passHash:passhash,
              username:data.user
            })
        newus.save(()=>{
            console.log("Save ho gyaa bava")
        })
        res.status(200).send("Registration Successfull")
    }
    catch(e){
        next(e)
    }
})

router.post('/login',async(req,res,next)=>{
    try{
        const data=req.body
        const user=await User.findOne({username:data.user})
        let comp='';
        if(user){
            comp=await bcrypt.compare(data.pass,user.passHash)
            if(!comp){
                res.status(401).send("Wrong PAssword")
                return
            }
        }
        else{
            res.status(401).send("User not found")
            return
        }
        const userForToken={
            username:user.username,
            id:user._id
        }
        const token = jwt.sign(userForToken, config.secret)
        res.status(200).send({
            token,
            username:user.username,
            name:user.name
        })
    }
    catch(e){
        next(e)
    }
})

module.exports=router