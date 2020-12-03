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

router.post("/create-bubble", async (req, res) => {
   let title = 'some Bubble'
   let user = 1

   if (user) {
      let createBubble = await models.Bubble.findOrCreate({
         where:
         {
            title: 'deez',
            bubble_status: "green",
         }
      })

      let bubble = createBubble[0]
      
      const bubbleId = bubble.id
      console.log(bubble.id)

      let bubbleMod = models.BubbleUser.build({
         user: user,
         bubble: bubbleId,
         isAccepted: true,
      })
      res.send(bubble)
   }
   else {
      res.status(404).send({
         message: 'Error: user id cannot be null'
      })
   }
})

router.get("/:id/bubbleuser/:bubbleuser", (req, res) => {
   let bubbleId = request.params.id
   let bubbleUser = request.params.bubbleuser

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
