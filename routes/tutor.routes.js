const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/tutor.controller");


// router.post('/subject/register', controller.findSubject);

module.exports = router;