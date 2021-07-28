const express= require('express');
const app =express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;

app.use(express.static('./assets'));
app
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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

