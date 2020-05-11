const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/auth");
const controller = require("../controllers/admin.controller");

  router.patch("/subject/:subjectId", authJwt.verifyToken, authJwt.isAdmin, controller.updateSubjectById); //update all subject by Id
  router.get("/subject", authJwt.verifyToken, authJwt.isAdmin,  controller.findAllSubjects); //retrieve all subjects
  // router.post("/subject/:id",authJwt.verifyToken, controller.createSubject); // 
  router.post("/subject/:id",authJwt.verifyToken, controller.createSubjectInCategory); // 


  router.get("/tutors", authJwt.verifyToken, authJwt.isAdmin, controller.getAllTutors); //get all tutors
  router.get("/tutor/:id", authJwt.verifyToken, authJwt.isAdmin, controller.getTutorById); //get all tutors by id
  router.delete("/tutor/:id", authJwt.verifyToken, authJwt.isAdmin, controller.deleteTutorById); //search for subjects by name, sorted alphabetically in ascending order
  router.post("/lesson", authJwt.verifyToken, authJwt.isAdmin, controller.createLesson); //search for tutors by first name, sorted alphabetically in ascending order.
  router.get("/lessons", authJwt.verifyToken, authJwt.isAdmin, controller.findAll); //find the lessons

  router.post("/category",authJwt.verifyToken, authJwt.isAdmin,controller.createCategory); // find all category
  router.delete('/category/:id', authJwt.verifyToken, authJwt.isAdmin, controller.deleteCategory); //update category
  router.delete('/subject/:id', authJwt.verifyToken, authJwt.isAdmin, controller.deleteSubject); //delete category

module.exports = router;