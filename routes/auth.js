const express = require("express")
const router = express.Router()
const models = require("../models")
const bcrypt = require("bcrypt")


router.post("/register", (req, res) => {
   const firstName = req.body.firstName
   const lastName = req.body.lastName
   const email = req.body.email
   const password = req.body.password
   bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
         console.log(err)
      }
      let newUser = models.User.build({
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: hash,
      })

      newUser.save().then(() => {
         res.send(console.log("Sent"))
      })
   })
   res.send(console.log("registering"))
})

router.get("/login", (req, res) => {
   if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user })
   } else {
      res.send({ loggedIn: false })
   }
})

router.post("/login", async (req, res) => {
   const email = req.body.email
   const password = req.body.password

   let user = await models.User.findOne({
      where: {
         email: email,
      },
   })
   if (user === null) {
      res.send("error")
   }
   if (user != null) {
      bcrypt.compare(password, user.password, (error, response) => {
         if (response) {
            req.session.user = user
            console.log(req.session.user)
            res.send(user)
         } else {
            res.send({ message: "Wrong email/password combination!" })
         }
      })
   } else {
      res.send({ message: "User doesn't exist" })
   }
})

module.exports = router
