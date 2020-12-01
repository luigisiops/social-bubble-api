const express = require('express')
const { brotliCompressSync } = require('zlib')
const app = express()
const PORT = 8080
const models = require('./models')

app.use(express.urlencoded())

app.post('/user', (req,res) => {
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




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})