const express = require("express")
const { builtinModules } = require("module")
const router = express.Router()
const models = require("../models")


//get list of all user's bubbles
router.get("/:userid/bubbles", async (req, res) => {
    let userid = req.params.userid
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

router.post("/update-status", async (req,res) => {
    // let user_id = req.body.user_id
    // let bubbles = [
    //     {
    //         "id": 3,
    //         "title": "OHWTFYB",
    //         "bubble_status": "blue",
    //         "createdAt": "2020-12-03T08:46:13.339Z",
    //         "updatedAt": "2020-12-03T08:46:13.339Z"
    //     },
    //     {
    //         "id": 8,
    //         "title": "some bubble",
    //         "bubble_status": "green",
    //         "createdAt": "2020-12-03T09:03:22.631Z",
    //         "updatedAt": "2020-12-03T09:03:22.631Z"
    //     }
    // ]



})



module.exports = router