require('dotenv').config()
const express = require('express')
const app = express()
// const cors = require('cors')
const port = process.env.PORT || 8000
const imageGeneratorRoute = require('./routes/imageGenratorRoutes')
//enable cross origin resource sharing
app.use(require('cors')())
//enable body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/openai', imageGeneratorRoute)

app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`)
})