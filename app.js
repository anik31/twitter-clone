const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
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
// app.set('views',path.join(__dirname+'/views'))
app.use(express.static(path.join(__dirname+'/public')))
app.get('/',(req,res) => res.render('home'))


app.listen(3000, () => console.log('Server running on port 3000'))