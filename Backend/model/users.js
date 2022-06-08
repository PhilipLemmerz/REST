const mongoose = require('mongoose');
const Schema  =  mongoose.Schema;

const userSchema =  new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'new User ',
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'entry'
    }
  ]
})


module.exports = mongoose.model('user', userSchema);
