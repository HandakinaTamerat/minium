require('dotenv').config();
const express = require('express');
const User = require('./../../models/user')
const jwt = require('jsonwebtoken')

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const userBody = new User(req.body)
  userBody.save((err, createdUser) => {
      if(err) {
          res.status(403).send({err})
      } else {
          let payload = {subject: createdUser._id}
          let token = jwt.sign(payload, process.env.SECRET_TOKEN)
          res.status(200).send({token})
      }
  })
})

//login
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
      if(err) {
          res.send({err})
      } else {
          if (!user) {
              res.status(401).send('Invalid email')
          } else {
              if(user.password !== req.body.password) {
                  res.status(401).send('Invalid password')
              } else {
                  let payload = {subject: user._id}
                  let token = jwt.sign(payload, process.env.SECRET_TOKEN)
                  res.status(200).send({token})
              }
          }
      }
  })
})

module.exports = router;