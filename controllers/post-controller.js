const Post=require('../models/post');
const User = require('../models/user');
const Comment=require('../models/comment');

module.exports.createPost=(req,res)=>{
    if(req.isAuthenticated())
    {
     
       Post.create({
           content:req.body.content,
           user:req.user.id
       },(err,postData)=>{
           if(err)
           {
               cnosole.log(`There is error in creating ${err}`);
               return;
           }
           else
           {
               console.log(postData);
               return res.redirect('back');
           }
       })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
};

module.exports.createComment=(req,res)=>{

    Post.findById(req.body.postId,(err,post)=>{
        if(err)
        {
            console.log(`There is some error in fetching data from post ${err}`);
            return;
        }
        else
        {
            Comment.create({
                postId:req.body.postId,
                content:req.body.content,
                user:req.user.id
            },(err, commentData)=>{
                if(err)
                {
                    cnosole.log(`There is error in creating Comment ${err}`);
                    return;
                }
                else
                {
                    post.comments.push(commentData);
                    post.save();
                    return res.redirect('back');
                }
            })
        }
    })
};

module.exports.destroyPost=(req,res)=>{

    Post.findById(req.params.postId,(err,success)=>{
        if(err)
        {
            console.log(`here is the error about the ${err}`)
            return;
        }
        //.id means c 
        if(success.user==req.user.id)
        {
           success.remove();
           //console.log(`here is desired post ${success}`);
           Comment.deleteMany({post:req.params.id},(err)=>{
               if(err)
               {
                   console.log(`${err}`)
                   return;
               }
               //console.log(`here is comment delete ${success}`);
               return res.redirect('back');
           })
        }
    })
}