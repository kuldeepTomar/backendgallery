const router=require('express').Router()
const config=require('../../config')
const jwt=require('jsonwebtoken')
const connect=require('../connection')
const Fulldata=connect.Todo
const Images=connect.Images

//Getall
router.post('/getall',async(req,res,next)=>{
        const dat=req.decodedToken
        const data=await Images.find({"$or":[{own:dat.username},{access:dat.username}]})
                               .select({_id:0,access:0,own:0,__v:0})
        res.status(200).send(data)
})

//Upload
router.post('/upload',async(req,res,next)=>{
        try{
            const dat=req.decodedToken
            const uploaddata=req.body
            const newImage=new Images({
                lat:uploaddata.lat,
                longi:uploaddata.longi,
                image:uploaddata.imgurl,
                story:uploaddata.story,
                own:dat.username,
                url:uploaddata.url,
                access:[]
                })
            newImage.save((a)=>{
                console.log("Saving the data",a)
        })
        res.status(200).send("Image Upload Successfull")
        }
        catch(e){
                res.status(401).send("Error Uploading data")
                next(e)
        }
        
})

//data to be sent has form of {imageid ,username}
router.post('/setaccess',async(req,res,next)=>{
        try{
                const data=req.body
                const tokendata=req.decodedToken
                const retdata=await Images.update(
                        { _id:data.imageid },
                        { "$push":{access:data.username}}
                        )
                res.status(200).send("Request Access Successfull")
        }
        catch(e){
                res.status(401).send("Request Access failed")
                next(e)
        }
})

module.exports=router