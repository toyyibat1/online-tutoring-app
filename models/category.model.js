const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name : {type:String, required: true},
    subjects: [{
        type: Schema.Types.ObjectId, ref: 'Subject'
    }]
});

 module.exports = mongoose.model('Category', CategorySchema)


