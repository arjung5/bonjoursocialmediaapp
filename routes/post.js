
const express=require('express');
const router=express.Router();
const passport=require('passport');

const postController=require('../controllers/post-controller');
const { route } = require('./users');

// router.get('/',postController.posts)

router.post('/create',postController.createPost);
router.post('/comment',postController.createComment);
router.get('/destroy/:postId',postController.destroyPost);
module.exports=router;

