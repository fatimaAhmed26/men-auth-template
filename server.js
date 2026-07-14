const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session')
const{MongoStore} = require('connect-mongo')
const fruitsCtrl =require('./controllers/fruits.controllers.js')
const authCtrl = require('./controllers/auth')
const Fruit= require('./models/fruits.js');
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.static(path.join(__dirname, 'public')))
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),

}))

app.get('/', (req, res) => {
    res.render('home.ejs', {
        user: req.session.user,
    })
})

app.get('/auth/home', authCtrl.home)
app.get('/auth/sign-up', authCtrl.showSignUpForm )
app.post('/auth/sign-up', authCtrl.signUp)
app.get('/auth/sign-in', authCtrl.showSignInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.delete('/auth/sign-out', authCtrl.signOut)

app.get('/dashboard', async (req, res) => {
    if (!req.session.user){
        return res.redirect('/auth/sign-in')
    }
    res.render('dashboard.ejs',{
        user: req.session.user
    })
})

//form for creating a new fruit 
app.get('/fruits/new', async (req,res)=>{
res.render('new.ejs')
})
//post /fruits 
app.post('/fruits',fruitsCtrl.newFruit)
    //get all fruits /fruits 
    app.get('/fruits',fruitsCtrl.index)
    //get show route 
    app.get('/fruits/:fruitId' ,fruitsCtrl.show)

    app.delete('/fruits/:fruitId', fruitsCtrl.deleteFruit)
    // edit (put)
    app.get('/fruits/:fruitId/edit',fruitsCtrl.edit)
    app.put('/fruits/:fruitId',fruitsCtrl.update)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});