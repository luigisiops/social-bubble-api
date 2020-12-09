const express = require("express")
const { builtinModules } = require("module")
const router = express.Router()
const models = require("../models")


// update user status on dashboard
router.put('/:userid/status', async (req, res) => {
    let userid = req.params.userid
    let status = req.body.user_status
    // let userStatus = req.body.userStatus

    // test status DELETE
    let userStatus = status

    const userUpdate = await models.User.update(
        {user_status: userStatus},
        {where: {id: userid},
        returning: true,
        plain: true
    })
   

    res.send(userUpdate[1])
})

//get list of all user's bubbles
router.get("/:userid/bubbles", async (req, res) => {
    let userid = req.params.userid
    let bubbleArray = []
       const bubbleUsers = await models.BubbleUser.findAll({
          where:{
             UserId: userid
          }
       })
 
       
    for (const bubbleUser of bubbleUsers){
      const test = await models.Bubble.findOne({
          where:{
             id: bubbleUser.BubbleId
          }
       })
       bubbleArray.push(test)
    }
    res.send(bubbleArray)
 
})

//change status of a user and their bubbles
router.post("/:userid/update-status", async (req,res) => {
    const user_id = req.params.userid
    const status = req.body.status
    const bubbleArray = []

    //will pass bubbles from global redux
    let bubbles = [
        {
            "id": 2,
            "title": "deez",
            "bubble_status": "green",
            "createdAt": "2020-12-03T08:46:13.339Z",
            "updatedAt": "2020-12-03T08:46:13.339Z"
        },
        {
            "id": 8,
            "title": "some bubble",
            "bubble_status": "green",
            "createdAt": "2020-12-03T09:03:22.631Z",
            "updatedAt": "2020-12-03T09:03:22.631Z"
        }
    ]

    const userUpdate = await models.User.update(
            {user_status: status},
            {where: {id: user_id}
    }) 
    const user = await models.User.findOne({
        where: {id: user_id}
    }) 

    for(const bubble of bubbles){ 
        if (status == "red"){
            const bubbleRed = await models.Bubble.update(
                {bubble_status: status},
                {where: {id: bubble.id}}
            )
        }else if(status == "yellow"){
            if(bubble.bubble_status == "green"){
                const bubbleYellow = await models.Bubble.update(
                    {bubble_status: status},
                    {where: {id: bubble.id}}
                )}
        }else{
            let bubbleUsersArray = []
            
            const bubbleUsers = await models.BubbleUser.findAll({
                where:{
                    BubbleId: bubble.id
                }
                })
            for (const bubbleUser of bubbleUsers){
                const user = await models.User.findOne({
                    where:{
                        id: bubbleUser.UserId
                    }
                    })
                bubbleUsersArray.push(user)
                  
                const redUsers = bubbleUsersArray.filter(user => user.status == "red")
                if(redUsers.length == 0){
                    
                    const yellowUsers = bubbleUsersArray.filter(user => user.status == "yellow")
                    if(yellowUsers.length == 0){
                        const bubbleColorGreen = await models.Bubble.update(
                            {bubble_status: "green"},
                            {where: {id: bubble.id}}
                        )
                    }else{
                        const bubbleColorYellow = await models.Bubble.update(
                            {bubble_status: "yellow"},
                            {where: {id: bubble.id}}
                        )
                    }
                }else{
                    const bubbleColorRed = await models.Bubble.update(
                        {bubble_status: "red"},
                        {where: {id: bubble.id}}
                    )
                }
        }

    }

    const userBubble = await models.Bubble.findOne({
        where:{
           id: bubble.id
        }
    })
    bubbleArray.push(userBubble)
}
    return res.send({user:user, bubbles:bubbleArray})
    

})



module.exports = router