const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})
module.exports=mongoose.model('job',jobSchema);