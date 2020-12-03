const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/", async (req, res) => {
   let id = req.body.id

   if (id) {
      const data = await models.Bubble.findOne({ where: { id: id } })
      res.send(data)
   }
   res.status(404).send({
      message: 'Error: missing bubble id'
   })
})

router.post("/create-bubble", (req, res) => {
   let title = req.body.title
   let user = req.body.id

   if (user) {
      let bubble = models.Bubble.build({
         title: title,
         bubble_status: "green",
      })
      res.send(bubble)
   }
   else {
      res.status(404).send({
         message: 'Error: user id cannot be null'
      })
   }
})

router.post

module.exports = router
