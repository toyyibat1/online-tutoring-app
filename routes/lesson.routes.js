const express = require('express');
const router = express.Router();
// const { authJwt } = require("../middleware/auth");
const lessons = require('../controllers/user.contoller');

// router.get('/lessons', [authJwt.verifyToken, authJwt.isAdmin], lessons.findAll); //retrieve all lesson
// router.get('/lesson/:lessonId', [authJwt.verifyToken, authJwt.isAdmin], lessons.lessonById); //retrieve a lesson in a lesson by Id
// router.post('/lesson', [authJwt.verifyToken], [authJwt.isStudentAdmin], lessons.create); // book or create a lesson

// router.patch('/lesson/:id', [authJwt.verifyToken, authJwt.isAdmin], lessons.updateLesson); //update lesson
// router.delete('/lesson/:id', [authJwt.verifyToken, authJwt.isAdmin], lessons.deleteLesson); //delete lesson

module.exports = router;