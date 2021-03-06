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



router.put('/:id', verifyToken, async (req, res) => {
    console.log(req.body);
    const filter = {_id: req.params.id}
    const update = {...req.body}
    // new:true to return the document after update
    let user;
    try {
      user = await User.findOneAndUpdate(filter, update, {new: true})
    } catch(e) {
        console.dir(e);
        res.status(401).send(e)
    }
    return res.status(200).send(user)
})

//get categories of user
router.get('/categories', verifyToken, async (req, res) => {

    let categories;
    try {
      let user = await User.findById(req.user._id).populate('categories')
      categories = user['categories']
    } catch(e) {
        console.log(e);
        res.status(401).send(e)
    }
    return res.status(200).send(categories)
})

module.exports = router;