// imports
const express = require("express")
require("dotenv").config
const app = express()


// Initailize app

// Database Configuration
const db = require("./config/db")



// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3001

// Middlewares
const logger = require("morgan")
const cors = require('cors')

// use Middlewares
app.use(logger())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Require Routes


// use Routes


// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})