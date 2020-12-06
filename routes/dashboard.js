const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res) => {
    models.User.findOne({
        where: {id: req.body.id}
    }).then((user) => {
        res.json(user)
    })
})

router.get('/bubbles', (req,res) => {
    models.BubbleUser.findAll({
        where: {UserId: req.body.id}
    }).then((bubbles) => {
        res.json(bubbles)
    })
})



router.get('/:id')


module.exports = router