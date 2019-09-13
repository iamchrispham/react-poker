const express = require('express');
const router = express.Router();
const userRoute = require('./user');
// const adminRoute = require('./admin')

router.use('/user', userRoute);
// router.use('/admin', adminRoute);
// router.use('/events'), eventRoute);

module.exports = router;