
const express=require('express');
const router=express.Router();
const passport=require('passport');

const postController=require('../controllers/post-controller');

// router.get('/',postController.posts)

router.post('/create',postController.createPost);
router.post('/comment',postController.createComment);

module.exports=router;

