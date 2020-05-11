const User = require('../models/user.model')
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');

module.exports = {
  createCategory : (req, res, next) => {
  const { name } = req.body
  if(name != 'primary' && name != 'jss' && name != 'sss' ){
    return res.status(404).send({ message: "sorry we can only create category of either primary, sss or jss"})
  }
  Category.findOne({ name}).then(result => {
    if (result) {
      return res.status(423).send({message: "This category already exist"});
    }else {
        const category = new Category({
          name,
        })
          category.save();
          return res.json(category);
        }
    }).catch(function(err) {
      res.json(err);
    });
},

  createSubject :async (req, res) => {
    const {name, category} = req.body
    const subject = new Subject({
      name,
      category: category,
    });
    subject.save(function(err){
      if(err) return handleError(err);
    });
  
  },

    getSubject :async (req, res) => {
    const id = req.params
    Subject.findOne({id})
    .exec(function(err, subject){
      if (err) return handleError(err);
    res.json(subject)  
    })
    }
    }
//   findSubjectBySubjectId : async (req, res) => {
//     Subject.find({category: primary._id}).exec(function(err, subjects){
//       if(err) return handleError(err);
//       res.json(subjects)
//     })
//   },
//   findAllSubjects : async(req, res) => {
//     const name = req.params
//     const subject = await Subject.find(name)
//     return res.send(subject)
// },
// findSubjectByCategoryName :  async(req, res) => {
//   const subjects = req.params.subjects
//   const subject = await Category.find({subjects}, null, {sort: {name: 1}})
//     return res.send(subject)
// },
// findByName :  async(req, res) => {
//   console.log(req.params) 
//   Subject.findOne({name: req.params.name}, null, {sort: {name: 1}})
//       .then(name => {
//           res.send(name);
//       }).catch(err => {
//           res.status(500).send({
//               message: err.message
//           });
//   });
// },
//  findAll : async (req, res) => {
//   console.log(req.params)
//   id = req.params
//  await Category.findOne({category: id._id }).populate('subjects')
//   .exec(function (err, subject) {
//   if (err) return handleError(err);
//   res.json(subject)
// });
// },
// findAllCategories : async (req, res) => {
//  await Category.find({}).populate('subjects')
//   .exec(function (err, subject) {
//   if (err) return handleError(err);
//   res.json(subject)
// });
// },
//  subjectsByCategory : async (req, res) => {
//    const {id} = req.params;
//   const category = await Category.findById(id).populate('subjects');
//   return res.send(category.subjects)
// },
// findSubjectByCategoryId : (req, res) => {
//   Subject.findOne({category: req.params.categoryId})
//   .exec(function(err, subjects){
//       if(err){
//           if(err.kind === 'ObjectId'){
//               return res.status(404).send({
//                   message: "Subjects not found with the given name" + req.params.categoryId
//               });
//           }
//           return res.status(500).send({
//               message: "Error retrieving subjects with a given categoryId" + req.params.categoryId 
//           });
//       }
//       res.send(subjects)
//   });
// },
// updateCategory : (req, res) => {
//   const category = new Category({
//     _id: req.params.id,
//     name: req.body.name,
//     description: req.body.description
//   });
//  Category.updateOne({_id: req.params.id}, category).then(
//     () => {
//       res.status(201).json({
//         message: 'Subject updated successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// },
// deleteCategory : (req, res, next) =>{
//  Category.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({
//         message: 'Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error:error
//       });
//     }
//   );
// }
// }

