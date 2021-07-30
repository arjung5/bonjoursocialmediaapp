const User=require('../models/user');
const fs=require('fs');
const path=require('path')
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
            req.flash('success','Congratulations Welcome');
            return res.redirect('/users/sign-in');
        })
    }
    else
    {
        req.flash('error','Password does not match , try again!');
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


module.exports.ProfileUpdate=async (req,res)=>{
    console.log('Uploading file controller');
    console.log( req.user.id);
   
    if(req.isAuthenticated())
    {
        try
        {
            console.log(`Enter in if tag`);
            let user=await User.findById(req.user.id);
            User.uploadedAvatar(req,res,(err)=>
            {
                if(err)
                {
                    console.log(`************ Multer Error :${err}`);
                }
                else
                {
                    console.log(req.file);
                    user.name=req.body.name;
                    user.email=req.body.email;
                    if(req.file)
                    {
                        if(user.avatar)
                        {
                            console.log(`This is value ${user.avatar}`);
                            fs.unlinkSync(path.join(__dirname ,'..',user.avatar));
                        }
                        //This is just the path of the uploaded file in the avatar field in the user
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    req.flash('success','Profile Has Been Updated'); 
                    return res.redirect('back');   
                }
            });
          
        }
        catch(err)
        {
            req.flash(`error','Some Error has occured : ${err}`); 
            return  res.redirect('back');
        }
    }
    else
    {
        req.flash(`error','UnAuthorized`); 
        return res.status(401).send('UnAuthorized');   
    }

    //converting code async to await
    // if(req.isAuthenticated())
    // {
    //     User.findByIdAndUpdate(req.user.id,{$set:{email:req.body.email,name:req.body.name}},(err,data)=>{
    //         if(err){
    //             console.log(`There is error in updating ${err}`);
    //             return;
    //         }
    //         else
    //         {
    //             req.flash('success','Profile Has Been Updated'); 
    //             return res.redirect('back');
    //         }
    //     })
    // }
}

module.exports.signOut=(req,res)=>{
    if(req.isAuthenticated())
    {
        req.logout();
        req.flash('success','You are Logout'); 
        return res.redirect('/');
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
}