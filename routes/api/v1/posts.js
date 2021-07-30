const express=require('express');
const router=express.Router();
const path=require('path');
const passport=require('../../../config/passport-jwt');


const postsApiController=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApiController.index);
router.delete('/:postId',passport.authenticate('jwt',{session:false}),postsApiController.destroy);

module.exports=router;