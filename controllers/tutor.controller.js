const User = require('../models/user.model');
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');
const Lesson = require('../models/lesson.model');

module.exports = {
  findSubjectInCategory : async (req, res) => {
      console.log(req.params)
      id = req.params
     await Category.findOne({category: id._id }).populate('subjects')
      .exec(function (err, subject) {
      if (err) return handleError(err);
      res.json(subject)
    });
  
  },
  // subjectById: async (req, res) => {
  //   const {id} = req.params;
  //   const categoryBySubject = await (await Subject.findById(id)).populate('subject');
  //   res.send(categoryBySubject);
  // },
  
  //retrieve all categories
  findAllCategories : async (req, res) => {
    await Category.find({})
     .exec(function (err, subject) {
     if (err) return handleError(err);
     res.json(subject)
   });
   },
  searchSubjectByName : (req, res, next ) =>{
    Subject.find().sort({ name : 1 })
    .then( result =>{
      res.status(200).send({
        status: true,
        message: result
      })
    })
  },
  searchTutorByName : (req, res, next ) =>{  
    var mysort = { firstname: 1 };
    User.find({role: 'tutor'}).sort(mysort)
    .then( tutor =>{
      res.status(200).send({
        status: true,
        message: tutor
      })
    })
  }
}