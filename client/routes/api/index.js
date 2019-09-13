const express = require('express');
const router = express.Router();

const privateRoute = require('./private');
const publicRoute = require('./public')
const adminRoute = require('./admin')
const userRoute = require('./user');
// const messageRoute = require('./messages')
const controlRoute = require('./control')

router.use('/user', userRoute);
router.use('/public', publicRoute);
router.use('/private', privateRoute);
router.use('/admin', adminRoute);
router.use('/control', controlRoute);
// router.use('/messages', messagesRoute);

module.exports = router;