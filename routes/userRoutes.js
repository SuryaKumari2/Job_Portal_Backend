const express=require('express');
const router=express.Router();
const middleware=require('../middlewares/verifyToken')
const userController=require('../controllers/userController')
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin)

module.exports=router;