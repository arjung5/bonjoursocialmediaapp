
const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users-controller');

router.get('/',usersController.users)

router.get('/sign-up',usersController.signupPage);
router.get('/sign-in',usersController.signinPage);
router.post('/sign-up',usersController.createUser);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),usersController.createSession);

module.exports=router;

