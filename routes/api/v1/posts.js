const express=require('express');
const router=express.Router();
const path=require('path');

const postsApiController=require('../../../controllers/api/v1/posts_api');

router.get('/',postsApiController.index);
router.delete('/:postId',postsApiController.destroy);

module.exports=router;