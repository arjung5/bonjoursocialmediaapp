const User=require('../models/user');

module.exports.homePage=(req,res)=>{
    User.find({},(err,data)=>{
        if(err)
        {
            console.log(`There is error in fetching the list of users : ${err}`);
            return;
        }
        return res.render('home',{
            title:"HOME PAGE",
            users_list:data
        });
    })
}