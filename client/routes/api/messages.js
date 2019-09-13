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
	res.json({ message: 'Hello from message endpoint! Here you can see admin posted messages' })
})

// app.get('/', function(req, res) {
// 	db.select()
// 	.from('messages')
// 	.orderBy('id')
// 	.then(function(data) {
// 		res.send(data)
// 	})
// })



module.exports = app