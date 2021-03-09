const mongoose = require('mongoose')
const initial = require('../app/controllers/role.controller')

mongoose.connect('mongodb+srv://copolat:04010072@cluster0.nxv3l.mongodb.net/userLogin?retryWrites=true&w=majority', {useNewUrlParser: true}, 
	(err) => {
	if (!err) {
		console.log('Successfully connected to database... ')
		initial.initial();
	} else {
		console.log('An error occured. Details: ' + err)
	} });
/* Alternative connection------
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {console.log("Connected to the database!")})
	.catch(err => {console.log("Cannot connect to the database!", err);
	process.exit();
	});
module.exports = mongoose;



*/
  
  module.exports = mongoose;