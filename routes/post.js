const express = require("express")
const router = express.Router()
const models = require("../models")

router.post("/", async (req, res) => {
    let body = 'new Post'
    let user = 8
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
          post_id: postid,
          bubble_id: bubble.id,
       })
    }
       res.send('Post Successful')

}
})

module.exports = router