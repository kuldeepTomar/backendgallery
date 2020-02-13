const router=require('express').Router()
const config=require('../../config')
const jwt=require('jsonwebtoken')

//adding token to the request
router.use((req,res,next)=>{
    const autha=req.get('authorization')
    if(autha && autha.toLowerCase().startsWith('bearer')){
        req.authtoken=autha.substring(7)||null
        next()
    }
    else{
        k={error: 'token missing or invalid'}
        res.status(401).send(k)
        next(JSON.stringify(k))
    }
})

//decoding token for access validation
router.use((req,res,next)=>{
    try{
        const token=req.authtoken
        const decodedToken = jwt.verify(token,config.secret)
        if (!token || !decodedToken.id) {
          res.status(401).json({ error: 'token missing or invalid' })
        }
        req.decodedToken=decodedToken
        next()
    }
    catch(e){
        next("Token Parsing error")
    }
})

module.exports=router