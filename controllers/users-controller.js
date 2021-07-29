const User=require('../models/user');

module.exports.users=(req,res)=>{
    User.find({},(err,data)=>{
        if(err)
        {
            console.log(`There is error in fetching the list of users : ${err}`);
            return;
        }
        return res.redirect('/');
    })
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
            return res.redirect('/signin');
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