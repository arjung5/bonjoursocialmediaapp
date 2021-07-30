const express=require('express');
const router=express.Router();


const homeController=require('../controllers/home_controller');



router.get('/',homeController.homePage);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/api',require('./api'));

module.exports=router;