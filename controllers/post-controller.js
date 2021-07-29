const Post=require('../models/post');
const User = require('../models/user');
const Comment=require('../models/comment');

module.exports.createPost=async (req,res)=>{
    if(req.isAuthenticated())
    {
     try
     {
        let post=await Post.create({
            content:req.body.content,
            user:req.user.id
       });
       return res.redirect('back');
     }
     catch(err)
     {
         console.log(`Error in creating post and the error is : ${err}`);
     }
    
    
    //converting code to async/await as above
    //    Post.create({
    //        content:req.body.content,
    //        user:req.user.id
    //    },(err,postData)=>{
    //        if(err)
    //        {
    //            cnosole.log(`There is error in creating ${err}`);
    //            return;
    //        }
    //        else
    //        {
    //            console.log(postData);
    //            return res.redirect('back');
    //        }
    //    })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
};

module.exports.createComment=async (req,res)=>{
  
    //Converted below callabck writter code to async await approch
    // Post.findById(req.body.postId,(err,post)=>{
    //     if(err)
    //     {
    //         console.log(`There is some error in fetching data from post ${err}`);
    //         return;
    //     }
    //     else
    //     {
    //         Comment.create({
    //             postId:req.body.postId,
    //             content:req.body.content,
    //             user:req.user.id
    //         },(err, commentData)=>{
    //             if(err)
    //             {
    //                 cnosole.log(`There is error in creating Comment ${err}`);
    //                 return;
    //             }
    //             else
    //             {
    //                 post.comments.push(commentData);
    //                 post.save();
    //                 return res.redirect('back');
    //             }
    //         })
    //     }
    // })

    if(req.isAuthenticated())
    {
        try
        {
            let post=await Post.findById(req.body.postId);
            let createCommet=await Comment.create({
                                     postId:req.body.postId,
                                     content:req.body.content,
                                     user:req.user.id
                                     });
            console.log(`This is value of Post ${post}`);
            post.comments.push(createCommet);
            post.save();
            return res.redirect('back');
        }
        catch(err)
        {
            console.log(`This is the error while creating post ${err}`);
            return;
        }
    }
    else
    {
        return res.redirect('back');
    }
};

module.exports.destroyPost=async (req,res)=>{

    if(req.isAuthenticated())
    {
        try
        {
            let post=await Post.findById(req.params.postId);
            if(post.user==req.user.id)
            {
                post.remove();
                let commentDelete=await Comment.deleteMany({post:req.params.id});
                return res.redirect('/')
            }
            else
            {
                return res.redirect('/')
            }
        }
        catch(err)
        {
            console.log(`This is the error while deleting post ${err}`);
            return;
        }
    }
    else
    {
        return res.redirect('/')
    }
    

    //converting below wriitern correct code in async/await for btter udenstanding 
    // Post.findById(req.params.postId,(err,success)=>{
    //     if(err)
    //     {
    //         console.log(`here is the error about the ${err}`)
    //         return;
    //     }
    //     //.id means c 
    //     if(success.user==req.user.id)
    //     {
    //        success.remove();
    //        //console.log(`here is desired post ${success}`);
    //        Comment.deleteMany({post:req.params.id},(err)=>{
    //            if(err)
    //            {
    //                console.log(`${err}`)
    //                return;
    //            }
    //            //console.log(`here is comment delete ${success}`);
    //            return res.redirect('back');
    //        })
    //     }
    // })
}