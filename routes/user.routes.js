const express = require('express');
const router = express.Router();
const authJwt  = require("../middleware/auth");
const controller = require("../controllers/user.contoller");

router.get('/category/:name', authJwt.verifyToken, controller.getsubjectByCategory);
router.get('/categories', authJwt.verifyToken, controller.findAllCategories);
router.get('/category/subjectId', authJwt.verifyToken, controller.getSubjectById);
router.get('/subjectName/:name', authJwt.verifyToken,controller.searchSubjectByName)
router.get('/tutorName/:name', authJwt.verifyToken, controller.searchTutorByName)

module.exports = router;