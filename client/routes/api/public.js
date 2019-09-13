const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
	throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors())

// don't need '/public'
app.get('/', function(req, res) {
	res.json({ message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.' })
})

module.exports = app