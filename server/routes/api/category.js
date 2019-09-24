require('dotenv').config();
const express = require('express');
const Category = require('./../../models/category')
const verifyToken = require('./verifyToken')

const router = express.Router();

// Get all categories
router.get('/', verifyToken, async (req, res) => {
    const categories = await Category.find({})
    return res.status(200).send(categories)
})

// create category
router.post('/', verifyToken, async (req, res) => {
    let category;
    try{
        category = await Category.create({...req.body})
    } catch(e) {
        return res.status(401).send(e)
    }
    return res.status(200).send(category)
})

// delete category
router.delete('/:id', verifyToken, async (req, res) => {
    let category;
    try{
        category = await  Category.findByIdAndDelete(req.params.id)
    } catch(e){
        return res.status(401).send(e)
    }
    return res.status(200).send(category)
})



module.exports = router;