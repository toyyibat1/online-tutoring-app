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

createSubjectInCategory : async (req, res) => {
  console.log(req.params);
  category= req.params;
  id = category.id
  const {name} = req.body;
  const subject = await Subject.create({
    name,
  });
await subject.save();
const categoryById = await Category.findById(id);

categoryById.subjects.push(subject)
await categoryById.save();

return res.send(categoryById);
},

createSubject : async (req, res) => {
  console.log(req.params);
  user= req.params;
  id = user.id
  const {name} = req.body;
  const subject = await Subject.create({
    name,
    user: id
  });
await subject.save();
const userById = await User.findById(id);

userById.subjects.push(subject)
await userById.save();

return res.send(userById);
},
categoryBySubject: async (req, res) => {
  const {id} = req.params;
  const categoryBySubject = await (await Subject.findById(id)).populate('subject');
  res.send(categoryBySubject);
},
  // createSubject :async (req, res) => {
  //   const {name, category} = req.body
  //   const subject = new Subject({
  //     name,
  //     category: category,
  //   });
  //   subject.save(function(err){
  //     if(err) return handleError(err);
  //   });
  
  // },
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
  
  updateSubjectById : (req, res) => {
      const subject = new Subject({
        _id: req.params.id,
        name: req.body.name
       });
     Subject.updateOne({_id: req.params.id}, subject).then(
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

//delete subject
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

createLesson: async(req, res, next)=> {
    try {
      const { subjectName, categoryName, tutorName, studentName } = req.body
        const studentRole = await User.findOne({username: studentName, role:'student'})
            if(!studentRole){
              return res
              .status(404).send({message: "No student is found"})
            }   
        const subject = await Subject.findOne({name: subjectName})
            if(!subject){
              return res
              .status(404).send({message: "No subject is found"})
              }         
            
        const tutorRole = await User.findOne({username:tutorName, role:'tutor'})
            if(!tutorRole){
              return res.status(404).send({message: "No tutor is found"})
            }
            const category = await Category.findOne({name: categoryName})
            if(!category){
              return res 
              .status(404).json({status: false, message: "Invalid category Name"})
            }  
      const ifLesson = await Lesson.findOne({studentName, subjectName, categoryName, tutorName})
            if(ifLesson){
              return res.status(400)
                .send({
                    status: false,
                    message: 'You cant create a book a new lesson. this lesson already exist.'
                })
            }
        const lesson = new Lesson({studentName, subjectName, categoryName, tutorName});
        await lesson.save();

        studentRole.lessons = studentRole.lessons.push(lesson._id);
            await studentRole.save();

        tutorRole.lessons = tutorRole.lessons.push(lesson._id)
            await tutorRole.save();

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
  const lesson = new Lesson({
    _id: req.params.id,
    username: req.body.name,
    type: req.body.type
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
        message: 'Deleted!'
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

