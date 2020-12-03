const express = require("express")
const router = express.Router()
const models = require("../models")

//get list of all users bubbles
router.get("/", async (req, res) => {
   let userId = 10
      const bubbleUsers = await models.BubbleUser.findAll({
         where:{
            user: userId
         }
      })

      console.log(bubbleUsers)
   for (const bubbleUser of bubbleUsers){
     const test = await models.Bubble.findOne({
         where:{
            id: bubbleUser.bubble
         }
      })
      console.log(test)
   }
   res.send('afjksaf')

   })
   


//get specific bubble
router.get("/:id", async (req, res) => {
   let id = req.params.id

   if (id) {
      const data = await models.Bubble.find({ where: { id: id } })
      res.send(data)
   }
   res.status(404).send({
      message: 'Error: missing bubble id'
   })
})

router.post("/create-bubble", async (req, res) => {
   let title = 'some Bubble'
   let user = 1

//mad dumb but build doesnt define the id in the promise but create does also create saves to db without save method(findOneOrCreate also works)
   if (user) {
      let createBubble = await models.Bubble.create({
            title: 'some bubble',
            bubble_status: "green",
      })

      let bubble = createBubble
      const bubbleId = bubble.id
      console.log(bubble.id)

      let bubbleMod = models.BubbleUser.create({
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

//get specific instance of bubble user
router.get("/:bubbleId/bubbleuser/:userId", async (req, res) => {
   let bubbleId = req.params.bubbleId
   let userId = req.params.userId

   if(bubbleId && userId){
      let bubbleUser = await models.BubbleUser.findOne({
         where:{
            bubble: bubbleId,
            user: userId
         }
      })
      res.send(bubbleUser)
   }
})

//add a new bubbleuser
router.post("/:bubbleId/bubbleuser", async (req, res) => {
   let user = req.body.user
   let bubbleId = req.params.bubbleId
 
//kept as build and not create so you can test
   if (bubbleId) {
      let bubbleMod = await models.BubbleUser.build({
         user: user,
         bubble: bubbleId,
         isAccepted: false,
      })
      res.send(bubbleMod)
   }
   else {
      res.status(404).send({
         message: 'Error: user id cannot be null'
      })
   }
})

router.post

module.exports = router
