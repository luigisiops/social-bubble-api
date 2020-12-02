const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res) => {
    models.User.findOne({
        where: {user_id: req.body.user_id}
    })
})



router.get('/:id')


module.exports = router