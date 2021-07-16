const router = require('express').Router()
const Post = require('../../models/post')
const {isLoggedIn} = require('../../middleware')
const User = require('../../models/users')

//get all posts
router.get('/api/post',async(req,res)=>{
    const posts = await Post.find({}).populate('postedBy')
    res.json(posts)
})

//create post
router.post('/api/post',isLoggedIn,async (req,res)=>{
    const post = {
        content : req.body.content,
        postedBy: req.user
    }
    const newPost = await Post.create(post)
    res.json(newPost)
})

//like posts
router.patch('/api/post/:id/like',isLoggedIn,async(req,res)=>{
    const postId = req.params.id
    const userId = req.user._id

    const isLiked = req.user.likes && req.user.likes.includes(postId)
    const option = isLiked ? '$pull' : '$addToSet'
    req.user  = await User.findByIdAndUpdate(userId, {[option] : {likes:postId}}, {new:true})
    const post  = await Post.findByIdAndUpdate(postId, {[option] : {likes:userId}}, {new:true})
    res.json(post)
})
module.exports = router