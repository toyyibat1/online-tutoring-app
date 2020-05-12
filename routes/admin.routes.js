const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/auth");
const controller = require("../controllers/admin.controller");

  router.patch("/subject/:subjectId", authJwt.verifyToken, authJwt.isAdmin, controller.updateSubjectById); //update all subject by Id
  router.get("/subject", authJwt.verifyToken, authJwt.isAdmin,  controller.findAllSubjects); //retrieve all subjects
  router.post("/subject/populate/:id",authJwt.verifyToken, authJwt.isAdmin, authJwt.isTutor, controller.createSubjectInCategory); // create a subject under a category with the category ID

  router.get("/tutors", authJwt.verifyToken, authJwt.isAdmin, authJwt.isUser, controller.getAllTutors); //get all tutors
  router.get("/tutor/:id", authJwt.verifyToken, authJwt.isAdmin, controller.getTutorById); //get all tutors by id
  router.delete("/tutor/:id", authJwt.verifyToken, authJwt.isAdmin, controller.deleteTutorById); //search for subjects by name, sorted alphabetically in ascending order
  router.post("/lesson", authJwt.verifyToken, authJwt.isAdmin,authJwt.isUser, controller.createLesson); //search for tutors by first name, sorted alphabetically in ascending order.
  router.get("/lessons", authJwt.verifyToken, authJwt.isAdmin, controller.findAll); //find the lessons
  router.get("/lesson/:id", authJwt.verifyToken, authJwt.isAdmin, controller.lessonById) //retrieve a lesson by id
  router.patch("/lesson/:id", authJwt.verifyToken, authJwt.isAdmin, controller.updateLesson); 
  router.delete("/lesson/:id", authJwt.verifyToken, authJwt.isAdmin, controller.deleteLesson);

  router.post("/category",authJwt.verifyToken, authJwt.isAdmin,controller.createCategory); // create a category
  router.delete('/category/:id', authJwt.verifyToken, authJwt.isAdmin, controller.deleteCategory); //update category
  router.delete('/subject', authJwt.verifyToken, authJwt.isAdmin, controller.deleteSubjectById); //delete category

module.exports = router;