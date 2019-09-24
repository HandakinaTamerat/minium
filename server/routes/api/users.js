require('dotenv').config();
const express = require('express');
const User = require('./../../models/user')
const verifyToken = require('./verifyToken')
const ObjectID = require('mongodb').ObjectID

const router = express.Router();

// Follow a User :id => user to be followed
router.post('/follow/:id', verifyToken, async (req, res) => {
    let follower;
    let followed;
    try {
        follower = await User.findById(req.user._id)
        followed = await User.findById(req.params.id)
    } catch(e) {
        res.status(401).send({"error": "user not found"})
    }

    if(await canFollow(followed, follower) === true) {
        followed.followers.push(follower)
        followed.save()

        follower.following.push(followed)
        follower.save()

        return res.status(200).send(follower)
    }
    return res.status(401).send({'error': "can't follow this user, please try again later"})
})

// unFollow a User :id => user to be followed
router.post('/unfollow/:id', verifyToken, async (req, res) => {
    let follower;
    let followed;
    try {
        follower = await User.findById(req.user._id)
        followed = await User.findById(req.params.id)
    } catch(e) {
        res.status(401).send({"error": "user not found"})
    }

    if(await canFollow(followed, follower) === false) {
        try {
            await User.update({
                _id: follower._id
            }, {
                $pull: {
                    following:{
                        $in: [followed._id]
                    }
                }
            })

            await User.update({
                _id: followed._id
            }, {
                $pull: {
                    followers:{
                        $in: [follower._id]
                    }
                }
            })
        } catch(e) {
            console.log(e)
        }
        return res.status(200).send(follower)
    }
    return res.status(401).send({'error': "can't unfollow this user, please try again later"})
})

async function canFollow(followed, follower) {
    // check if the user to be followed has already this follower
    let followers = await followed.followers
    const followerExist = followers.includes(follower._id)

    // check if the follower already following the user who wants to follow
    let following = await follower.following
    const followingExist = following.includes(followed._id)

    if (followingExist===true || followerExist===true){
        return false
    }
    else{
        return true
    }
}

router.post('/emailcheck', async (req, res) => {
    const email = req.body.email
    let user
    try {
        user = await User.findOne({
        email: email
        })
    } catch (e) {
        return res.status(402).send('problem trying to find a user with this email')
    }
    
    if(user) {
        return res.status(200).send(true)
    }
        return res.status(200).send(false)
})

module.exports = router;