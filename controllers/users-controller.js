const { Console } = require('console');
const User=require('../models/user');

module.exports.users=(req,res)=>{
    // User.find({},(err,data)=>{
    //     if(err)
    //     {
    //         console.log(`There is error in fetching the list of users : ${err}`);
    //         return;
    //     }
    //     return res.redirect('/',{
    //         users_list:data
    //     });
    // })
    if(req.isAuthenticated())
    {
        return res.end('<p>This is users page</p>');
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
}

module.exports.signupPage=(req,res)=>{
    return res.render('signup',{
        title:'SignUp Page'
    })
}

module.exports.createUser=(req,res)=>{
    if(req.body.password==req.body.confirm_password)
    {
        User.create(req.body,(err,data)=>{
            if(err)
            {
                console.log(`There is error in fetching the list of users : ${err}`);
                return;
            }
            return res.redirect('/sign-in');
        })
    }
    else
    {
        return res.redirect('back');
    }
};

module.exports.createSession=(req,res)=>{
    // if(req.body)
    // {
    //     User.find({email:req.body.email},(err,data)=>{
    //         if(err){
    //               alert('some error occured , please try again');
    //               return res.redirect('/create-session');
    //             }
    //         else{
    //             console.log(data);
    //             res.redirect('/');
    //         }
    //     })
    // }
    return res.redirect('/');
};

module.exports.signinPage=(req,res)=>
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
        return res.render('signin',{
            title:'Sign In Page'
        })
    }
}
module.exports.Profile=(req,res)=>{
    console.log('Enter in the profile')
    console.log(req.params.userId);
    if(req.isAuthenticated())
    {
        User.findById(req.params.userId,(err,data)=>{
            if(err)
            {
                console.log(`There is some error while getting data from : ${err}`);
                return;

            }
            console.log(`The data is ${data}`);
            return res.render('profile',{
                userData:data
            })
        })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
}


module.exports.ProfileUpdate=(req,res)=>{
    if(req.isAuthenticated())
    {
        User.findByIdAndUpdate(req.user.id,{$set:{email:req.body.email,name:req.body.name}},(err,data)=>{
            if(err){
                console.log(`There is error in updating ${err}`);
                return;
            }
            else
            {
                return res.redirect('back');
            }
        })
    }
}

module.exports.signOut=(req,res)=>{
    if(req.isAuthenticated())
    {
        req.logout();
        return res.redirect('/');
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
}