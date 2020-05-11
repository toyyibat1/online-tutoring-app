const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/user.contoller");



module.exports = router;