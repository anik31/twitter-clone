const router = require('express').Router()
const User = require('../models/users');
const passport = require('passport')
const {isLoggedIn} = require('../middleware')

//GET register form
router.get('/register',(req,res) => {
                res.render('auth/signUp',{message:req.flash('error')})
            }) 
//POST register form
router.post('/register',async(req,res)=>{
    try{
    const user = {
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        email : req.body.email,
        username : req.body.username
        }
        const newUser = await User.register(user,req.body.password)
        req.flash("success","Registered Successfully,Please Login to continue")
        res.send(newUser)
    }catch(err){
        req.flash('error',err.message)
        res.redirect('/register')
    }
})
//Login
router.get('/login',(req,res)=> res.render('auth/login'))
router.post('/login', passport.authenticate('local',
{
    failureRedirect : '/login',
    failureFlash:true
}),(req,res)=> res.redirect('/'))

//logout
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/login')
})
module.exports = router