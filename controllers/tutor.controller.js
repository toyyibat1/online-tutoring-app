const User = require('../models/user.model');
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');
const Lesson = require('../models/lesson.model');

module.exports = {
  // findSubject: async (req, res, next)=> {
  //   try {
  //     const {name, tutorId} = req.body    
  //       const subject = await Subject.findOne({name})
  //           if(!subject){
  //             return res
  //             .status(404).send({message: "No subject already exist"})
  //             }        
            
  //       const tutorRole = await User.findById({_id:tutorId})
  //           if(!tutorRole){
  //             return res.status(404).send({message: "No tutor is found"})
  //           }

  //         const newSubject = new Subject({
  //           name, 
  //           tutorId
  //         })
  //         newSubject.save()

  //           const findSubject = await Subject.findOneAndUpdate(name);
  //           findSubject.tutors.push(tutor)
  //             await findSubject.save();
    
  //             const findTutor = await User.findByIdAndUpdate(tutorId, {username: studentName});
  //             findTutor.subjects.push(name)
  //             await findTutor.save(); 
              
  //             const registesubject = await Subject.findOne(name);
  //      res.json({
  //        message: "subjects registered successfully",
  //        data: registesubject,
  //      })
  //   }catch(error){
  //       res.status(400)
  //           .send({message: error});
  //   }
  // }
}
