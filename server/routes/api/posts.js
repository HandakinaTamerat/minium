require('dotenv').config();
const express = require('express');
const Post = require('./../../models/post')
const User = require('./../../models/user')
const verifyToken = require('./verifyToken')

const router = express.Router();

// get all posts
router.get('/posts', verifyToken, async (req, res) => {
  const posts = await Post.find({}).sort({'createdAt': -1})
  return res.status(200).send(posts)
})

// get user's posts
router.get('/posts/user', verifyToken, async (req, res) => {
  const posts = await Post.find({
    user: req.user
  })
  return res.status(200).send(posts)
})

// add post
router.post('/posts', verifyToken, async (req, res) => {
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
router.put('/posts/:id', verifyToken, async (req, res) => {
  const filter = {_id: req.params.id}
  const update = {...req.body}
  // new:true to return the document after update
  let post;
  try {
    post = await Post.findOneAndUpdate(filter, update, {new: true})
  } catch(e) {
    return res.status(500).send({"Cast to ObjectId failed": "Post with this Id does not exist"})
  }
  return res.status(200).send(post)
})

// delete post
router.delete('/posts/:id', verifyToken,async (req, res) => {
  let post;
  try {
    post = await Post.deleteOne({_id: req.params.id})
  } catch(e) {
    return res.status(500).send({"Cast to ObjectId failed": "Post with this Id does not exist"})
  }
  return res.status(200).send(post)
})

module.exports = router;