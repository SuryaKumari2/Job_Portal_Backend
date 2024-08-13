const Job=require('../models/job')

const addJob=async(req,res)=>{
    try {
        const {companyName,position,location,experience,salary,skills}=req.body;
        const newjob=new Job({
            companyName,position,location,experience,salary,skills, postedBy: req.user._id 
        });
        await newjob.save();
        res.status(200).json({message:"job added succesfully",newjob})

        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

const getAllJob=async(req,res)=>{
    try {
        const {userId}=req.params;
        let jobs=await Job.find({postedBy:userId}).populate('postedBy','userName');
        console.log('Received userId:', userId); 
        if(!jobs){
            return res.status(402).json({message:' no job found'})
        }
        res.status(200).json(jobs);

        
        
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

const getAllJobsForSeeker=async(req,res)=>{
    try {
        let jobs=await Job.find().populate('postedBy','userName');
        if(!jobs){
            return res.status(404).json({message:'no jobs'})
        }
        res.status(200).json(jobs);
        
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}


module.exports={addJob,getAllJob,getAllJobsForSeeker}