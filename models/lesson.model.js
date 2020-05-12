const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {type: String, required: true},
    studentName: {type: String, required: true},
    tutorName: {type: String, required: true},
    subjectName: {type: String},
    time: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Lesson', lessonSchema)





