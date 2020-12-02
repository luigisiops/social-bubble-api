const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/", (req, res) => {
   models.BubbleUser.findAll({
      where: { user: req.body.id },
   }).then((bubbles) => {
      res.json(bubbles)
   })
})

router.post("/create-bubble", (res, req) => {
   let title = req.body.title
   let user = req.body.id

   let bubble = models.Bubble.build({
      title: title,
      bubble_status: "green",
   })

   let bubbleUser = models.BubbleUser.build({})

   bubble.save().then(() => {

   }


   /*       .then(() => {})
      .then(() => {
         res.redirect("/create-bubble-user", {
            user: user,
         })
      }) */
})

router.post

router.module.exports = router
