const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/auth");
const controller = require("../controllers/admin.controller");

  router.get("/subject", authJwt.verifyToken, controller.getSubject); //all users can retrieve a subject in a category (by Id)
//   router.get("/subject/:subjectId", [authJwt.verifyToken], controller.findSubjectBySubjectId); //retrieve a subjects, bysubjectId
//   router.get("/allsubject/subjectName", [authJwt.verifyToken], controller.findSubjectByCategoryName); //retrieve all subject in a category
//   router.get("/allSubjectCategories/:id", [authJwt.verifyToken], controller.findAll); //find all subjects in a category
//   router.get("/subjectByName/:subjectName", controller.findByName); //search for subjects by name, sorted alphabetically in ascending order
//  // app.get("/api/test/Alltutor", controller.FindAlltutorByName); //search for tutors by first name, sorted alphabetically in ascending order.
router.post("/subject",authJwt.verifyToken, controller.createSubject); // find all category
 router.post("/category",authJwt.verifyToken, controller.createCategory); // find all category
//   router.get("/category/:id", [authJwt.verifyToken], controller.subjectsByCategory); //find 1 subject in a category
//   router.post("/category/:id",[authJwt.verifyToken, authJwt.isTutorAdmin],controller.create ); // admin create subjects under 3 categories by categoryID: primary, JSS, SSS
//   router.patch('/categories/update/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updateCategory); //update category
//   router.delete('/categories/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory); //delete category

module.exports = router;