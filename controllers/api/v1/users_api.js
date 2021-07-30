const User=require('../../../models/user');
const jwt=require('jsonwebtoken');



module.exports.createSession=async (req,res)=>{
    console.log('Enter in the session');
    console.log(req.body.email);
    console.log(`this is user passworkd ${req.body.password}`);
    try{
        let user=await User.findOne({ email:req.body.email});
      
        if(!user || user.password!=req.body.password)
        {
            console.log(`Error aa gaya`);
            return res.json(422,{
                message:'Invalid username or password'
            })
        }
        console.log('sab theek h bc yaha');
        return res.json(200,{
            message:'Sign In Successful , here it is your token please keep it safe',
            data:{
                token:jwt.sign(user.toJSON(),'arjungarg',{expiresIn:'1000000'})
            }
        })
    }catch(err)
    {
        return res.json(500,{
            message:err.message
        });
    }

};