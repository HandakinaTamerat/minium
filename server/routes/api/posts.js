require('dotenv').config();
const express = require('express');
const Post = require('./../../models/post')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')

const router = express.Router();

const posts = [
  {
    username: 'a1@a.com',
    title: 'post 1'
  },
  {
    username: 'a2@a.com',
    title: 'post 2'
  }
]

// get posts
router.get('/posts', verifyToken, (req, res) => {
  if(!req.user) return res.sendStatus(403)
  return res.json(posts.filter(post => 
    post.username === req.user.email))
})

// add posts
router.post('/posts', verifyToken, (req, res) => {
    
})

module.exports = router;