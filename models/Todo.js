const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  //creates the moongoose schema for the date stamp
  createdAt:{
    type: Date,
    default: Date.now
},
//creates the moongoose schema for the urgency id. Takes in a 'Red' 'Yellow' or 'Green' from HTML form
urgent:{
  type:String,
  required: true
}
})

module.exports = mongoose.model('Todo', TodoSchema)
