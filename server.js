// server.js
const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const app = express();


app.use(cors());


/* The route to get a JWT isn’t checking any credentials, its just 
serving up a JWT when asked for one. This is just for simplicity. 
Use a proper mechanism for checking credentials 
(check out ReactSecurity for guides on how to do so). */


// routes
// const dashboardRouter = require("./routes/dashboard")
// const authRouter = require("./routes/auth")
// const bubbleRouter = require("./routes/bubbles")



const jwtSecret = 'secret123';


app.get('/jwt', (req, res) => {
  res.json({
    token: jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret)
  });
});


app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));


const register = [
  { id: 1, description: 'test5' },
  { id: 2, description: 'test5@emaol.com' },
  { id: 3, description: 'test5' }
];


app.get('/register', (req, res) => {
  res.json(register);
});


app.listen(8080);
console.log('App running on localhost/8080');
