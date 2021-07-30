const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
// this wil be the one which will help to extarct jwt from headers

//Defining code and endoce key

let ops={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"arjungarg"
}
//Always remember jwt is build up from header+payload+signature
passport.use(new JwtStrategy(ops,(jwtPayLoad,done)=>{
    User.findById(jwtPayLoad._id,(err,user)=>{
        if(err)
        {
            console.log(`Three is error in finding user from JWT`);
            return done(err);
        }
        if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    })
}));

module.exports=passport;