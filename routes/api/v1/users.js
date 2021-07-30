const express=require('express');
const router=express.Router();
const path=require('path');

const usersApiController=require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersApiController.createSession);

module.exports=router;