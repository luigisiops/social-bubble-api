const express = require("express")
const router = express.Router()
const models = require("../models")
const bcrypt = require("bcrypt")
const session = require("express-session");
const saltRounds = 10

const jwt = require('jsonwebtoken')


router.use(
   session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
         expires: 60 * 60 * 24,
      },
   })
)
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
         id: "",
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: hash,
      })

   newUser.save().then(() => {
         res.send(newUser)
      }) 
   })
})
// const verifyJWT = (req, res, next) => {
//    const token = req.headers["x-access-token"]
 
//    if (!token){
//      res.send("Yo! we need a token, try again.")
//    } else {
//      jwt.verify(token, "jwtSecret", (err, decoded) => {
//        if (err) {
//          res.json({auth: false, message: "Failed to authenticate!"});
//        } else {
//          req.userId = decoded.id;
//          next();
//        }
//      });
//    }
//  };
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
   if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (error, response) => {
        if (response) {
          // WE WANT THE ID BECAUSE WE NEED TO CREATE OUR TOKEN WITH THAT
          const id = user[0].id
          // IMPORTANT: WE NEED TO PUT jwtSecret from line 96 in the .env file and pass it in through a variable 
          const token = jwt.sign({id}, "jwtSecret", {
            // VALUE FOR TOKEN EXPIRATION 300= 5 minutes
            expiresIn: 300,
          })
          req.session.user = result;
          // WE HAVE TO SEND TOKEN TO FRONT END
        // check if user is authorized then pass token we createad and pass all results all info from users: id, username, role, group whatever.
          res.json({
            auth: true, 
            token: token, 
            result: result
          });
          console.log(req.session.user);
        } else {
          res.json({
            // if it exists but password is wrong send message
            auth: false, 
            message: "wrong username or password."
          });
        }
      });
    } else {
      // if it doesnt exist send message.
     res.json({
       auth: false, 
       message: "no user exists. please check user name or register."
      });
    }
  });


module.exports = router
