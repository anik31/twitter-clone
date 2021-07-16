const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/users')
const {isLoggedIn} = require('./middleware')
const flash = require('connect-flash')

const app = express()

mongoose.connect('mongodb://localhost:27017/twitter-clone', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(()=> console.log("Database connected successfully!!"))
.catch(err => console.log(err))

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname+'/public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Routes
const auth = require("./routes/auth")
const post = require("./routes/api/posts")

app.use(session({
    secret: 'lenovoideapad',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})
app.use(auth)
app.use(post)
  
app.get('/',isLoggedIn,(req,res) => res.render('home'))


app.listen(3000, () => console.log('Server running on port 3000'))