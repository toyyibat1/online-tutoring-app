const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/user.contoller");

router.get('/category/:name', controller.getsubjectByCategory);
router.get('/categories', controller.findAllCategories);
router.get('/category/subjectId', controller.getSubjectById);
router.get('/subjectName/:name', controller.searchSubjectByName)
router.get('/tutorName/:name', controller.searchTutorByName)

module.exports = router;