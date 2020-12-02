const express = require('express')
const { brotliCompressSync } = require('zlib')

//const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;


const app = express()
const PORT = 8080
const models = require('./models')

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

/*const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});*/



app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post('/user', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName


    let newUser = models.Project.build({
        first_name: firstName,
        last_name: lastName
    })

    newUser.save().then(() => {
        res.send(console.log('Sent'))
    })
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong email/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
});


app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        /*
            db.query(
              "INSERT INTO users (email, password) VALUES (?,?)",
              [email, hash],
              (err, result) => {
                console.log(err);
              }
            );*/

        let newUser = models.User.build({
            email: email,
            password: hash
        })

        newUser.save().then(() => {
            res.send(console.log('Sent'))
        })

    });
    res.send(console.log('registering'))
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
















