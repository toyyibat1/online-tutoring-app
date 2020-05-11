const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name:{type: String},
    tutors:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    category: {type: String, required: true },
    timeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Subject', subjectSchema);