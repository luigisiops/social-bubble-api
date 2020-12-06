const express = require("express")
const router = express.Router()
const models = require("../models")


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
            BubbleId: id
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

      let bubbleMod = await models.BubbleUser.create({
         User: user,
         BubbleId: bubbleId,
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
            BubbleId: bubbleId,
            UserId: userId
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
         UserId: user,
         BubbleId: bubbleId,
         isAccepted: false,
      })
      res.send(bubbleMod)
})


//removes user from a bubble
router.post("/:bubbleid/remove-user/:userid", (req, res) => {
   let bubbleid = req.params.bubbleid
   let userid = req.params.userid

   models.BubbleUser.destroy({
      where: {
         UserId: userid,
         BubbleId: bubbleid 
      }
   }).then(() => {
      res.send('User Deleted From Bubble')
   })

})
  
//deletes the bubble
router.post("/:bubbleid/delete-bubble", async(req,res) => {
   let bubbleid = req.params.bubbleid
   
   await models.BubbleUser.destroy({
      where: {
         BubbleId: bubbleid
      }
   })
   
   await models.Bubblepost.destroy({
      where: {
         BubbleId: bubbleid
      }
   })

   await models.Bubble.destroy({
      where: {
         id: bubbleid
      }
   })



   res.send('Bubble Successfully Deleted')

})

router.post

module.exports = router
