
const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController=require('../controllers/users-controller');

router.get('/',usersController.users)

router.get('/sign-up',usersController.signupPage);
router.get('/sign-in',usersController.signinPage);
router.post('/sign-up',usersController.createUser);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),usersController.createSession);
router.get('/profile/:userId',usersController.Profile);
router.post('/profile/update',usersController.ProfileUpdate)
router.get('/sign-out',usersController.signOut);

module.exports=router;

