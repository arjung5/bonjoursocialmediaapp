const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/bonjourSocialApp',{ useUnifiedTopology: true ,useNewUrlParser: true}).then(console.log(`Sucessfully connected to Mongo`)).catch((err)=>{console.log(`Encountered error at connecting to db : ${err}`)});

const db=mongoose.connection;

module.exports=db;
