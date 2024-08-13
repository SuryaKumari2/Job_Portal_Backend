const express=require('express');
const jobController=require('../controllers/jobController');
const applicationController=require('../controllers/applicationController')
const verifyToken=require('../middlewares/verifyToken')
const roleCheck=require('../middlewares/roleCheck')
const router=express.Router();

const path = require('path');

router.post('/add-job',verifyToken,roleCheck(["employer"]),jobController.addJob);
router.get('/get-empjob/:userId',verifyToken,roleCheck(["employer"]),jobController.getAllJob);
router.get('/get-jobs',verifyToken,jobController.getAllJobsForSeeker);

router.post('/apply/:jobId',verifyToken,roleCheck(['jobseeker']),applicationController.addApplication);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/delete/:jobId',verifyToken,roleCheck(['jobseeker']),applicationController.deleteApplication);

router.get('/get/:jobId',verifyToken,roleCheck(['employer']),applicationController.getApplication);
module.exports=router;



