const express= require('express');
const app =express();
const port=8000;

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err)
    {
        console.log(`This is the error encountered that is : ${err}`);
        return;
    }
    console.log(`Server is running at port number : ${port}`);
})

