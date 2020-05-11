
const Lesson = require('../models/lesson.model');

module.exports = {
  create : async (req, res) => {
    const {username, type} = req.body;
    const lesson = await Lesson.create({
      type,
      username
    })
    await lesson.save();
    return res.send(lesson);
  },
 
 findAll : async (req, res) => {
    const lesson = await Lesson.find()
    return res.send(lesson)
 },
//  lessonById : async (req, res) => {
//   const lesson = await Lesson.findById(l=> l._id === parseInt(req.params._id));
//     if(!lesson) return res.status(404).send('The Lesson with given id not found');
//     else res.status(200).json(lesson);
  // lessonById : async (req, res) => {
  //   const {id} = req.params;
  // const lesson = await Lesson.findById(id);

  // return res.send(lesson)
  // },
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

