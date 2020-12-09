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
router.post("/create-post/:bubbleid", async (req, res) => {
    let body = req.body.body
    let user = req.body.user_ids
    let bubbleId = req.params.bubbleid

   
      
 
 //mad dumb but build doesnt define the id in the promise but create does also create saves to db without save method(findOneOrCreate also works)
    if (user) {
       const createPost = await models.Post.create({
             UserId: user,
             body: body
       })
 
       let post = createPost
       const postid = post.id
       
       const newpost = await models.Bubblepost.create({
          PostId: postid,
          BubbleId: bubbleId,
       })

       const Bubblepost = await models.Bubblepost.findOne({
         where: { id: newpost.id}, include:[
            {
               model: models.Post,
                  include:[
                     models.User
                  ]}
            ]
       })
    
      res.send(Bubblepost)
}
})

//delete post
router.delete("/:postid/delete-post", async(req,res) => {
   let postid = req.params.postid
   
   await models.Bubblepost.destroy({
      where: {
         PostId: postid
      }
   })
   
   const post = await models.Post.destroy({
      where: {
         id: postid
      }
   })

   res.send({})

})

module.exports = router