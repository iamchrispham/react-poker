const express = require("express");
const app = express();
const db = require("../../db");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
require("dotenv").config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const checkScopesAdmin = jwtAuthz(["write:messages"]);

// Original admin post route.
// app.post('/', checkJwt, checkScopesAdmin, function(req, res) {
// 	res.json({ message: 'Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this.' })
// })

// Admin get route coded with Auth0 functions.
// app.get('/', checkJwt, checkScopesAdmin, (req,res) => {
// 	db.select()
// 	.from('users')
// 	.orderBy('id')
// 	.then((data) => {
// 		res.send(data)
// 	})
// })

// returns admins...Don't need that yet.
app.get("/", (req, res) => {
  db.select()
    .from("admins")
    .orderBy("id")
    .then(data => {
      res.send(data);
    });
});

// Called in AdminControl. Passed down to ListUser
app.get("/users", (req, res) => {
  db.select()
    .from("users")
    .orderBy("id")
    .then(data => {
      res.send(data);
    });
});

app.get("/control/users");

app.get("/control/:id", (req, res) =>
  db("users")
    .where({ id: req.params.id })
    .first()
    .then(function(data) {
      res.send(data);
    })
);

// INSERT INTO 'tableName"(col1, col2) VALUES (col1_value, col2_value);
// SELECT * FROM TABLE WHERE ID = inserted_row;
app.post("/", (req, res) => {
  db.insert(req.body)
    .returning("*")
    .into("users")
    .then(data => {
      res.send(data);
    });
});

// PATCH only modifies the one we submit in the body.
// app.patch('/:id', function(req, res) {
// 	db('users')
// 		.where({ id: req.params.id })
// 		.update(req.body)
// 		.returning('*')
// 		.then(function(data) {
// 			res.send(data)
// 		})
// })

// PUT should replace everything with whats in body + replacing the rest with null.
// app.put('/:id', function(req,res) {
// 	db('users')
// 		.where({ id: req.params.id })
// 		.update({
// 			email: req.body.email || null,
// 			hashed_pw: req.body.hashed_pw || null,
// 			name: req.body.name || null,
// 			phone: req.body.phone || null,
// 			balanceHours: req.body.balanceHours || null,
// 			qualifierHours: req.body.qualifierHours || null,
// 			access: req.body.access || null
// 		})
// 		.returning('*')
// 		.then(function(data) {
// 		res.send(data)
// 	})
// })

// app.delete('/:id', function(req,res) {
// 	db('users')
// 		.where({ id: req.params.id })
// 		.first()
// 		.del()
// 		.then(result => {
// 			res.json({ success: true })
// 			// if(result.access == 'admin') {
// 			// 	knex('users')
// 			// 		.where({ id: req.params.id })
// 			// 		.del()
// 			// 		.then(postDelete => {
// 			// 			res.status(200).json("User Succesfully Deleted");
// 			// 		});
// 			// } else {
// 			// 	res.status(400).json("You Need Admin Privileges to Delete a User");
// 			// }
// 		});
// });

module.exports = app;
