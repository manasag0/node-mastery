const mongoose = require('mongoose');

// const Cat = mongoose.model('Cat', { name: String });

// 1st version
// const postsModel = mongoose.model('Post', {
//     id: String,
//     user: String,
//     content: String
// });

//2nd version - more options added
// const postsModel = mongoose.model('Post', {
//     id: {type: String, required: true},
//     user: {type: String, required: true},
//     content: {type: String, required: true},
// });

//3rd version - Added schema
const postSchema =  mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
});

const postsModel = mongoose.model('Post', postSchema);

module.exports = postsModel;