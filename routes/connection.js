const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost:27017/hariom',{ useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('open',()=>console.log("database connect ho gyaa bava"))

const dataSchema=new mongoose.Schema({
    lat:String,
    longi:String,
    image:String,
    story:String,
    url:String,
    own:String,
    access:[String]
})

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    passHash:{
        type:String,
    },
    username:{
        type:String,
        unique:true,
    },
    data:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Images"
    }]
})

UserSchema.plugin(uniqueValidator);
const Todo = mongoose.model('users',UserSchema);
const Images=mongoose.model('Images',dataSchema);
module.exports={Todo,Images}
