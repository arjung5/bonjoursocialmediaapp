const Post = require('../models/post');
const User=require('../models/user');

module.exports.homePage= async (req,res)=>{
    //Coverting the code to async await beacause we send flash messages to user and reduces code reading complexity
    // Post.find({})
    //    .populate('user')
    //    .populate(({
    //        path:'comments',
    //        populate:{
    //            path:'user'
    //        }
    //    })).exec((err,dataPost)=>{
    //     if(err)
    //     {
    //         console.log(`There is error in getting post list : ${err}`);
    //         return;
    //     }
    //     else
    //     {
    //         //console.log(dataPost);
    //         User.find({},(err,data)=>{
    //             if(err)
    //             {
    //                 console.log(`There is error in fetching the list of users : ${err}`);
    //                 return;
    //             }
    //             return res.render('home',{
    //                 title:"HOME PAGE",
    //                 users_list:data,
    //                 post_List:dataPost
    //             });
    //         })
    //     }        
    // });



    //async await version of code
    try{
        let post =await Post.find({}).populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        let user=await User.find({});
        return res.render('home',{
                            title:"HOME PAGE",
                            users_list:user,
                            post_List:post
                        });
    }catch(ex)
    {
        cosole.log(`There is error coming in reading data for home page${err}`);
        return;
    }
   
}