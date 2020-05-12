const User = require('../models/user.model')
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');
const Lesson = require('../models/lesson.model')

module.exports = {
  createCategory : async(req, res, next) => {
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
//can create subjects under 3 categories: primary, JSS, SSS
createSubjectInCategory : async (req, res) => {
  console.log(req.params);
  category= req.params;
  id = category.id
  const {name} = req.body;
  const subject = await Subject.create({
    name,
    categoryid: id
  });
await subject.save();

const categoryById = await Category.findById(id);

categoryById.subjects.push(subject)
await categoryById.save();

return res.send(categoryById);
},
getsubjectInCategory: async (req, res) => {
  const {id} = req.params;
  const getSubject = await (await Category.findById(id)).populate('subject');
  res.send(getSubject);
},

categoryBySubject: async (req, res) => {
  const {id} = req.params;
  const categoryBySubject = await (await Subject.findById(id)).populate('subject');
  res.send(categoryBySubject);
},
  findAllSubjects :(req, res) => {     
    Subject.find({})
        .then(subject => {
           if(!subject) {            
             res.status(404).send();          
           }        
           res.send({subject}); 
        }).catch((e) => {     
             res.status(400).send(e);  
        });
  },
  
  updateSubjectById : (req, res, next ) =>{
    const{name} = req.body
    const {subjectId} = req.params
      Subject.findById(subjectId)
      .then( result =>{
        if(!result){
          return res
          .status(404).send({ status: false, message: "Subject not found"});
        } else{
          Subject.findByIdAndUpdate(subjectId, {name}, { new: true } ).then( () =>{
            Subject.findById(subjectId)
            .then( subject =>{
              return res.status(200).send({message: "subject updated successfully",
           subject})
            })
          })
        }
      }).catch(err => console.log(err))
  },
  // updateSubjectById : (req, res) => {
  //     const subject = new Subject({
  //       _id: req.params.id,
  //       name: req.body.name
  //      });
  //    Subject.updateOne({_id: req.params.id}, subject).then(
  //       () => {
  //         res.status(201).json({
  //           message: 'Subject updated successfully!'
  //         });
  //       }
  //     ).catch(
  //       (error) => {
  //         res.status(400).json({
  //           error: error
  //         });
  //       }
  //     );
  //   },

//delete subject
deleteSubjectById: async (req, res) => {
  console.log(req.params);
  category= req.params;
  id = category.id
  const {subjectId} = req.body;
  const subject = await Subject.findById({
    subjectId,
  });
await Subject.findByIdAndDelete(subjectId);

const categoryById = await Category.update({$pull: { "subjects": { $gte: subjectId }}});

categoryById.subjects.pull(subject)
await categoryById.save();

return res.send(categoryById);
},
deleteSubject : (req, res) =>{
Subject.deleteOne({_id: req.params.id}).then(
  (subject) => {res.status(200).json({message: ' Subject Deleted!', subject});
}
).catch(
  (error) => {
    res.status(400).json({
      error:error
    });
  });
},
deleteCategory : (req, res, next) => {
  Category.deleteOne({_id: req.params.id}).then(
    (category) => { res.status(200).json({message: 'Category Deleted', category})
    }
  ).catch((e)=> res.status(400).send(e))

},
getAllTutors : (req, res, next ) =>{
  User.find({ role: 'tutor'})
  .then( user =>{
    return res
    .status(200).send({status: true, data: user })
  }).catch(err => console.log(err))
},
getTutorById : (req, res, next ) =>{
  User.findOne({_id: req.params.id})
  .then( user =>{
    return res
    .status(200).send({status: true, data: user })
  }).catch(err => {
    res.status(400).json({message : "tutor does not exist"});
  })
},

deleteTutorById : (req, res) => {
  User.deleteOne({_id: req.params.id})
  .then(user => {
     res.status(200).json({message: 'Tutor Deleted', user})
    }
  ).catch((e)=> res.status(400).send(e))
  },

createLesson: async (req, res, next)=> {
    try {
      const {name, subjectName, tutorName, studentName } = req.body
           
        const subject = await Subject.findOne({name:subjectName})
            if(!subject){
              return res
              .status(404).send({message: "No subject is found"})
              }         
            
        const tutorRole = await User.findOne({username:tutorName})
            if(!tutorRole){
              return res.status(404).send({message: "No tutor is found"})
            }
        const studentRole = await User.findOne({username: studentName})
        if(!studentRole){
          return res
          .status(404).send({message: "No student is found"})
        }
        
      const findlesson = await Lesson.findOne({
        name,
        studentName,
        subjectName, 
        tutorName, 
        })
            if(findlesson){
              return res.status(400)
                .send({
                    status: false,
                    message: 'You cant create a book a new lesson. this lesson already exist.'
                })
            }
        const lesson = new Lesson({
          name,
          studentName,
          subjectName, 
          tutorName, 
          });
        await lesson.save();

        const tutorLesson = await User.findOne( {username: tutorName});
        tutorLesson.lessons.push(lesson)
          await tutorLesson.save();

          const studentLesson = await User.findOne( {username: studentName});
        studentLesson.lessons.push(lesson)
          await studentLesson.save();

        res.status(200)
            .send({
                status: true,
                message: 'lesson booked successfully.',
                lesson
            })        
    }catch(error){
        res.status(400)
            .send({message: error});
    }
    
},
 
 findAll : async (req, res) => {
    const lesson = await Lesson.find()
    return res.send(lesson)
 },
  lessonById :(req, res, next) => {
    Lesson.findOne({
      _id: req.params.id
    }).then(
      (lesson) => {
        res.status(200).json(lesson);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error:error
        });
      }
    );
  },  
updateLesson : (req, res) => {
  const {name, studentName, tutorName,subjectName} = req.body
  const lesson = new Lesson({
    _id: req.params.id,
    name,
    studentName,
    tutorName, 
    subjectName 
  });

 Lesson.updateOne({_id: req.params.id}, lesson).then(
    () => {
      res.status(201).json({
        message: 'Subject updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
},
deleteLesson : (req, res, next) =>{
 Lesson.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Lesson Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error:error
      });
    }
  );
}
}

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

