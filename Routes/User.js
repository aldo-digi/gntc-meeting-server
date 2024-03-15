const express = require('express')
const router = express.Router();
const {signin, signUp} = require("../Controllers/User");

router.post('/login', signin);
router.post('/signup', signUp);

module.exports = router;