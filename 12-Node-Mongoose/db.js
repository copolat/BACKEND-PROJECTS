const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://copolat:JDvPpkl8jTuXlrh0@cluster0.nxv3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}, 
	(err) => {
	if (!err) {
		console.log('Successful connection... ')
	} else {
		console.log('An error occured. Details: ' + err)
	} });

  
  module.exports = mongoose;