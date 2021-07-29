const Post = require('../models/post');
const User=require('../models/user');

module.exports.homePage=(req,res)=>{
    Post.find({})
       .populate('user')
       .populate(({
           path:'comments',
           populate:{
               path:'user'
           }
       })).exec((err,dataPost)=>{
        if(err)
        {
            console.log(`There is error in getting post list : ${err}`);
            return;
        }
        else
        {
            //console.log(dataPost);
            User.find({},(err,data)=>{
                if(err)
                {
                    console.log(`There is error in fetching the list of users : ${err}`);
                    return;
                }
                return res.render('home',{
                    title:"HOME PAGE",
                    users_list:data,
                    post_List:dataPost
                });
            })
        }        
    });
}