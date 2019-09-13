const express = require('express')
const bodyParser = require('body-parser')
const apiRoute = require('./routes/api/index.js')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use('/api', apiRoute)

const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')
const cors = require('cors')
require('dotenv').config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('Nathans new server is listening on http://localhost:3001. The react app should be built and served at http://localhost:3000.')
