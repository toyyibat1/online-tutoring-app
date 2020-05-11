const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/tutor.controller");

router.get('/subject/:categoryId', controller.findSubjectInCategory)
router.get('/categories', controller.findAllCategories)
router.get('/subjectName', controller.searchSubjectByName)
router.get('/tutorName', controller.searchTutorByName)

module.exports = router;