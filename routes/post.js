const express = require("express")
const router = express.Router()
const models = require("../models")


//Returns all posts for one bubble
router.get("/:bubbleid", async (req,res) => {
    let bubble_id = req.params.bubbleid
    const posts = await models.Bubblepost.findAll({  
      where: { BubbleId:bubble_id}, include: 
      [{
         model: models.Post,
            include:[
               models.User
            ]}
      ]
   })
    res.send(posts)
})


//Create Post
router.post("/create-post", async (req, res) => {
    let body = req.body.body
    let user = req.body.user_id

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
   
      
 
 //mad dumb but build doesnt define the id in the promise but create does also create saves to db without save method(findOneOrCreate also works)
    if (user) {
       let createPost = await models.Post.create({
             UserId: user,
             body: body
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

//delete post
router.post("/:postid/delete-post", async(req,res) => {
   let postid = req.params.postid
   
   await models.Bubblepost.destroy({
      where: {
         PostId: postid
      }
   })
   
   await models.Post.destroy({
      where: {
         id: postid
      }
   })

   res.send('Post Successfully Deleted')

})

module.exports = router