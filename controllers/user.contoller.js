const User = require('../models/user.model');
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');
const Lesson = require('../models/lesson.model');

module.exports = {
 // retrieve a subject in a category 
   getSubjectById : (req, res, next ) =>{
    const { subjectId, categoryName } = req.body;
    Category.findOne({ name: categoryName })
    .populate({path: 'subjects', match: { _id: subjectId }})
    .then( result =>{
      if(!result){
        return res.status(404).json({status: false, message: "no value found"})
      }else{
        return res
      .status(200).json({ status: true, message: result.subjects })
      }
      
    }).catch( err => console.log )
  
},
  getsubjectByCategory: async (req, res) => {
    const {name} = req.params
    const category = await (await Category.findOne({name: name})).populate('subjects');
    res.send(category);
  },

  findAllCategories : async (req, res) => {
    await Category.find({})
     .exec(function (err, subject) {
     if (err) return handleError(err);
     res.json(subject)
   });
   },
  searchSubjectByName : (req, res, next ) =>{
    const {name} = req.params
    Subject.find({name}).sort({ name : 1 })
    .then( result =>{
      res.status(200).send({
        status: true,
        message: result
      })
    })
  },
  searchTutorByName : (req, res, next ) =>{ 
    const {name} = req.params 
    var mysort = { firstname: 1 };
    User.find({firstname: name}).where({role: 'tutor'}).sort(mysort)
    .then( tutor =>{
      res.status(200).send({
        status: true,
        message: tutor
      })
    })
  }
}