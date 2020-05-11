const express = require('express');
const router = express.Router();
// const { authJwt } = require("../middleware/auth");
const controller = require('../controllers/tutor.controller');

    // router.post('/subject/:Categoryid', [authJwt.verifyToken], controller.create); //create subject under each category by categoryId
    // router.get('/subjects/populate/:id', [authJwt.verifyToken],controller.categoryBySubject); //get a particular subject by subjectId
    // router.get('/subject/:id', [authJwt.verifyToken],controller.findSubjectById) //retrieve a subject in a category
    // router.get('/subjects', [authJwt.verifyToken],controller.findAll);
    // router.get('/subjects/:subjectName', [authJwt.verifyToken],controller.findByName); //byname in asceding order
    // router.get('/subjects/category/:categoryId', [authJwt.verifyToken],controller.findByCategoryId); // retrieve all subject in a category

    // router.patch('/subject/update/:id', [authJwt.verifyToken, authJwt.isTutorAdmin],
    // controller.updateSubjectByCategory); //update subject by id //update a subject in a category (by Id)

    // router.delete('/subject/delete/:id', [authJwt.verifyToken, authJwt.isTutorAdmin],
    // controller.deleteSubject); //Admin can delete a subject in a category (by Id)
    // //delete or update a category

module.exports = router;