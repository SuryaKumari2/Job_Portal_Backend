const mongoose=require('mongoose');
const applicationSchema=new mongoose.Schema({
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job',required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    resume:{type:String},
    Date:{type:Date,default:Date.now},
    status:{type:String,enum:['pending','reviewed','shortlisted','rejected'],default:'pending'},
})

module.exports=mongoose.model('application',applicationSchema)