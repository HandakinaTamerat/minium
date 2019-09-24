require('dotenv').config();
const express = require('express');
const User = require('./../../models/user')
const Post = require('./../../models/post')
const verifyToken = require('./verifyToken')
const Comment = require('./../../models/comment')

const router = express.Router();

// get all posts
router.get('/page/:page?', verifyToken, async (req, res) => {
  const resPerPage = 9; // results per page
  const page = req.params.page || 1; // Page 
  const posts = await Post.find({}).sort({'createdAt': -1}).populate('user', User)
  .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  return res.status(200).send(posts)
})

// get post by id
router.get('/:id', verifyToken, async (req, res) => {
  const posts = await Post.findById(req.params.id).populate('user', User).populate('commets').populate('category')
  return res.status(200).send(posts)
})

// get posts by category
router.get('/category/:category', verifyToken, async (req, res) => {
  const posts = await Post.find({
    category: {
      $in: [req.params.category]
    }
  }).populate('user', User)
  return res.status(200).send(posts)
})

// get user's posts
router.get('/user', verifyToken, async (req, res) => {
  const posts = await Post.find({
    user: req.user
  })
  return res.status(200).send(posts)
})

// add post
router.post('/', verifyToken, async (req, res) => {
    let post = new Post({...req.body})
    post.user = req.user
  try{
    post = await post.save()
    return res.status(200).send(post)
  } catch(e) {
    console.log(e)
    return res.status(500).send(err)
  }
})

// update post
router.put('/:id', verifyToken, async (req, res) => {
  const filter = {_id: req.params.id}

  const update = {...req.body}
  // new:true to return the document after update
  let post;
  try {
    post = await Post.findOneAndUpdate(filter, update, {new: true})
  } catch(e) {
    console.log(e)
    return res.status(500).send({"Cast to ObjectId failed": "Post with this Id does not exist"})
  }
  return res.status(200).send(post)
})

// delete post
router.delete('/:id', verifyToken,async (req, res) => {
  let post;
  try {
    post = await Post.deleteOne({_id: req.params.id})
  } catch(e) {
    return res.status(500).send({"Cast to ObjectId failed": "Post with this Id does not exist"})
  }
  return res.status(200).send(post)
})

// highFive a post
router.post('/:id/highfive', verifyToken, async (req, res) => {
  let post
  try {
    post = await Post.findOne({ _id: req.params.id })
  } catch(e) {
    return res.status(401).send({error: 'post not found'})
  }
  const count = post.highFives.filter(
    hf => hf.user == req.user._id
  ).length
  if(count > 9) {
    return res.status(401).send({'Limit': 'You can only high five a post author for 10 times...'})
  }
  const highFive = {
    user: req.user
  }
  post.highFives.push(highFive)
  post.save()
  return res.status(200).send(post)
})

// add comment
router.post('/comment', verifyToken, async (req, res) => {
  let comment = new Comment({...req.body})
  comment.user = req.user
try{
  comment = await comment.save()
  return res.status(200).send(comment)
} catch(e) {
  console.log(e)
  return res.status(500).send(err)
}
})


module.exports = router;