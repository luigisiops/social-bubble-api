const express = require("express")
const router = express.Router()
const models = require("../models")

//get list of all users bubbles
router.get("/:id", async (req, res) => {
   let userid = req.params.id
   let bubbleArray = []
      const bubbleUsers = await models.BubbleUser.findAll({
         where:{
            user: userid
         }
      })

      
   for (const bubbleUser of bubbleUsers){
     const test = await models.Bubble.findOne({
         where:{
            id: bubbleUser.bubble
         }
      })
      bubbleArray.push(test)
   }
   res.send(bubbleArray)

   })
   


//get specific bubble
router.get("/:id", async (req, res) => {
   let id = req.params.id

   if (id) {
      const data = await models.Bubble.findOne({ where: { id: id } })
      res.send(data)
   }
   res.status(404).send({
      message: 'Error: missing bubble id'
   })
})

//Fetches all users in a bubble
router.get("/:bubbleid/users", async (req, res) => {
   let id = req.params.bubbleid
   let userArray = []
   
      const bubbleUsers = await models.BubbleUser.findAll({
         where:{
            bubble: id
         }
      })

      for (const bubbleUser of bubbleUsers){
         const user = await models.User.findOne({
             where:{
                id: bubbleUser.user
             }
          })
          userArray.push(user)
       }
      res.send(userArray)

})


router.post("/create-bubble", async (req, res) => {
   let title = 'new Bubble'
   let user = 8

//mad dumb but build doesnt define the id in the promise but create does also create saves to db without save method(findOneOrCreate also works)
   if (user) {
      let createBubble = await models.Bubble.create({
            title: title,
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
      let bubbleMod = await models.BubbleUser.create({
         user: user,
         bubble: bubbleId,
         isAccepted: false,
      })
      res.send(bubbleMod)
})

router.post

module.exports = router
