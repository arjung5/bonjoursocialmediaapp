const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async (req,res)=>{
    let post=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    //let postObject=JSON.parse(post[0]);

     return res.json(200,{
         message:'This is list of posts',
         posts:post
     })
 };

 module.exports.destroy=async (req,res)=>{
    try
    {
        let post=await Post.findById(req.params.postId)
        post.remove();
        await Comment.deleteMany({post:req.params.postId});

        return res.json(200,({
            message:'Post and comment are deleted succeefully'
        }))
        // if(req.xhr)
        // {
        //     return res.status(200).json(({
        //     data:{
        //         post_id:""
        //     },
        //     message:"Post Deleted"
        //     }))
         //}
    //     else
    //    {
    //       return res.json(401,({
    //         message:'Unauthrized'
    //        }))
    //    }
    }
    catch(err)
    {
        return res.json(500,({
            message:'internal server error'
        }))
    }
 };