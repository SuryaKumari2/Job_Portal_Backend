const Application=require('../models/application');

const multer=require('multer');
const path=require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });


const addApplication=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const {userId}=req.body;
        console.log(`User ID: ${userId}`);
        console.log(`Job ID: ${jobId}`);
        const resume=req.file?req.file.filename:undefined;
        if(!jobId ){
            console.log(`job id not found`)
            return res.status(402).json({message:'job not found'})
        }
        if(!userId ){
            console.log(`user id not found`)
            return res.status(402).json({message:'user not found'})
        }
        
        const newApplication =new Application({
            jobId,userId,resume
        })
        await newApplication.save();

        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
        
        
        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}


const getApplication=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const applications = await Application.find({ jobId: jobId });

        
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this job.' });
        }


        return res.status(200).json(applications);
        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}


const deleteApplication=async(req,res)=>{
    try {
        const {applicationId}=req.params
        
        if (!applicationId) {
            return res.status(400).json({ message: 'Application ID is required' });
        }

        // Attempt to delete the application
        const result = await Application.findByIdAndDelete(applicationId);
        if(!result)
        {
            return res.status(400).json({message:'deletion failed'})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

module.exports={addApplication:[upload.single('image'),addApplication],deleteApplication,getApplication}

