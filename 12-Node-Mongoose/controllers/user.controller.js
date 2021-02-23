const User = require('../models/user.model.js');

exports.create = (req, res) => {
  const user = new User({
  email: req.body.email,
  name: req.body.name,
  createdDate: req.body.createdDate,
  isActive: req.body.isActive,
  gender: req.body.gender
})
user.save().then((data)=>res.send(data)).catch((error)=>res.send(error))
}



exports.findAll = (req, res) => {
  User.find()
                .then((resultData) => {res.json(resultData)})
                .catch((error)=>{res.json(error)});
};