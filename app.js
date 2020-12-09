// dependencies
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const express = require("express")
const app = express()


const { brotliCompressSync } = require("zlib")
const models = require("./models");
const auth = require("./middlewares/authMiddleware.js");
const { Op } = require("sequelize");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();


app.use(cors());
app.use(bodyParser.json());

let router = express.Router();
router.use(bodyParser.json());
// routes
const dashboardRouter = require("./routes/dashboard")
const authRouter = require("./routes/auth")
const bubbleRouter = require("./routes/bubble")
const postRouter = require("./routes/post")
const userRouter = require("./routes/user")



const PORT = process.env.PORT || 8080


app.use(express.json())
app.use(
   cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
   })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
   session({
      key: "email",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
         expires: 60 * 60 * 24,
      },
   })
)

// routes
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
  
    if (!token){
      res.send("Yo! we need a token, try again.")
    } else {
      jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
          res.json({auth: false, message: "Failed to authenticate!"});
        } else {
          req.userId = decoded.id;
          next();
        }
      });
    }
  };
app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("Authentication Confirmed. OMW2FYB")
  })
app.use("/dashboard", dashboardRouter)
//importing router
app.use("/auth", authRouter)
app.use("/bubble", bubbleRouter)
app.use("/post", postRouter)
app.use("/user", userRouter)



app.post('/register', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        let newUser = models.User.build({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hash
        })

        newUser.save().then(() => {
            res.send(console.log('Sent'))
        })

    });
    res.send(console.log('registering'))
}); 

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
}); 

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let user = await models.User.findOne({
        where: {
            email: email
        }
    })
    if (user === null) {
        res.send('error');
    }
    if (user != null) {
        bcrypt.compare(password, user.password, (error, response) => {
            if (response) {
                req.session.user = user;
                console.log(req.session.user);
                res.send(user);
            } else {
                res.send({ message: "Wrong email/password combination!" });
            }
        });
    } else {
        res.send({ message: "User doesn't exist" });
    }
}
);

// LISTENER
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
