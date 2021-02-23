const mongoose = require('mongoose'); // Add mongoose to the project
const Schema = mongoose.Schema  // A schema is coding a collection in mongoose


const UserSchema = new Schema({
  email: String,
  name: String,
  createdDate: {type:Date, default:Date.now},
  isActive: Boolean,
  gender: {type: String, default: 'Male'}
})



module.exports = mongoose.model('user', UserSchema) // First parameter is always lowercase, without 's', if you add any name that ends with 'y', mongoose will convert it into 'ies'