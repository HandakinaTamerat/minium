require('dotenv').config();
const express = require('express');
const User = require('./../../models/user')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/emailcheck', async (req, res) => {

    const email = req.body.email
    let count=0;
    try {
        count = await User.count({
        email: email
        })

    } catch (e) {
        return res.status(402).send('problem trying to find a user with this email')
    }

    if(count > 0) {
        return res.status(200).send(true)
    }
    console.log(count);
        return res.status(200).send(false)
    
})

// Register
router.post('/register', (req, res) => {
  const userBody = new User(req.body)

  bcrypt.hash(userBody.password, 10, function(err, hash) {
    userBody.password = hash
    userBody.save()
  });

  userBody.save((err, createdUser) => {
      if(err) {
          res.status(403).send({err})
      } else {
          let token = generateAccessToken(createdUser)
          res.status(200).send({token, user: createdUser})
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
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(!result) {
                return res.status(401).send('Invalid password')
            } else {
                const token = generateAccessToken(user)
                const refreshToken = jwt.sign({...user}, process.env.SECRET_REFRESH_TOKEN)
                delete user.password
                return res.status(200).json({token, refreshToken, user: user})
            }
        }) //bycrypt
      } // else
  })
})

function generateAccessToken(user) {
    return jwt.sign({...user}, process.env.SECRET_TOKEN, { expiresIn: '120m'})
}


module.exports = router;