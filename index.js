const express= require('express');

const db=require('./config/mongoose-setup');


const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-setup');



const app =express();
const flash=require('connect-flash');
const customeMw=require('./config/middlewareCustom');
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views','./views');

const MongoStore = require('connect-mongo');
app.use(session({
    name:'bonjour',
    //ToDo change the secret before deployemnt in production mode
    secret:'arjungarg',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60)
    },
    store:MongoStore.create(
        {
        // mongooseConnection:db,
        mongoUrl: 'mongodb://localhost/bonjourSocialApp',
        autoRemove:'disabled'
        },
        function(err)
        {
        console.log(err || 'connect mongodb setup pk');
        }
    )

}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customeMw.setFlash);
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log(`This is the error encountered that is : ${err}`);
        return;
    }
    console.log(`Server is running at port number : ${port}`);
})

