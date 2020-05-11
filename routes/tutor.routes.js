const express = require('express');
const router = express.Router();
// const { authJwt } = require("../middleware/auth");
const controller = require("../controllers/tutor.controller");


  // router.post("/register", authJwt.verifyToken, authJwt.isTutor, controller.registerSubject);
  // router.get("/tutor", [authJwt.verifyToken], controller.getAllTutors); //all users can retrieve a subject in a category (by Id) 
  // router.get("/category", [authJwt.verifyToken, authJwt.isAdmin], controller.subjectsByCategory);
  // router.delete('/categories/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory); //delete category

module.exports = router;