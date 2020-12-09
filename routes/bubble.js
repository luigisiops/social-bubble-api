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
   let bubbleId = req.params.bubbleid
   
   
   let bubbleUsers = await models.BubbleUser.findAll({
      where: {BubbleId: bubbleId}, include:
      [{
         model: models.User
      }]
   })

   res.send(bubbleUsers)

})

//create a bubble
router.post("/create-bubble", async (req, res) => {
   let title = req.body.title
   //will pass user id from React/Redux
   let user = req.body.userId

   if (user) {
      let createBubble = await models.Bubble.create({
            title: title,
            bubble_status: "green",
      })

      let bubble = createBubble
      const bubbleId = bubble.id
      console.log(bubble.id)

      let bubbleMod = await models.BubbleUser.create({
         UserId: user,
         BubbleId: bubbleId,
         isAccepted: true,
         owner: true
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
   let email = req.body.email
   let bubbleId = req.params.bubbleId

   let user = await models.User.findOne({
      where:{
         email:email
      }
   })
   
   if(user){
      let InBubble = await models.BubbleUser.findOne({
         where:{
            UserId: user.id,
            BubbleId: bubbleId
         }
      }) 

      if(!InBubble){
      let bubbleU = await models.BubbleUser.create({
         UserId: user.id,
         BubbleId: bubbleId,
         isAccepted: false,
         owner: false
      })
      } 
   }

   let bubbleUsers = await models.BubbleUser.findAll({
      where: {BubbleId: bubbleId}, include:
      [{
         model: models.User
      }]
   })

   res.send(bubbleUsers)


})


//removes user from a bubble
router.delete("/:bubbleid/remove-user/:userid", (req, res) => {
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
router.delete("/:bubbleid/delete-bubble", async(req,res) => {
   let bubbleid = req.params.bubbleid
   console.log(bubbleid)
   
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
