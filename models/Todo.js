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
//creates the moongoose schema for the urgency id. Takes in a 'Yes' or 'No' from HTML form
urgent:{
  type:String,
  
}
})

module.exports = mongoose.model('Todo', TodoSchema)
