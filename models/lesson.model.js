const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    subjectName: {type:String, required: true}, 
    tutorName:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    categoryName: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    studentName: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    time: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Lesson', SubjectSchema)





