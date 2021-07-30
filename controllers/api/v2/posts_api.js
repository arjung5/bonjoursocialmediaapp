module.exports.index=(req,res)=>{
    return res.json(200,{
        message:'This is list of posts and v2',
        posts:[]
    })
};