const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/:id", async (req,res) => {
    let bubble_id = req.params.id
    const posts = await models.Bubblepost.findAll({  
      where: { BubbleId:bubble_id}, include: 
      [{model: models.Post}]
   })
    res.send(posts)
})

router.post("/create-post", async (req, res) => {
    let body = req.body.body
    let user = req.body.user_id
    let bubbles = [
        {
          "id": 3,
          "title": "deez",
          "bubble_status": "blue",
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
 
 //mad dumb but build doesnt define the id in the promise but create does also create saves to db without save method(findOneOrCreate also works)
    if (user) {
       let createPost = await models.Post.create({
             user_id: user,
             body:body
       })
 
       let post = createPost
       const postid = post.id
       
       for (const bubble of bubbles){
       let bubblepost = models.Bubblepost.create({
          PostId: postid,
          BubbleId: bubble.id,
       })
    }
       res.send('Post Successful')

}
})

module.exports = router