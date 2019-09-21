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
          console.log(createdUser)
          let token = generateAccessToken(createdUser)
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
          if(!user) {
            return res.status(401).json({
                error: 'User does not exist'
            })
          }
        if(user.password !== req.body.password) {
            res.status(401).send('Invalid password')
        } else {
            const token = generateAccessToken(user)
            const refreshToken = jwt.sign({...user}, process.env.SECRET_REFRESH_TOKEN)
            res.status(200).json({token, refreshToken})
        }
      }
  })
})

function generateAccessToken(user) {
    return jwt.sign({...user}, process.env.SECRET_TOKEN, { expiresIn: '10m'})
}


module.exports = router;