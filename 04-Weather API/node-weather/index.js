const request = require('request');
require('dotenv').config();
let apiKey=process.env.apiKey;

const city = 'Paris';
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`


request(url, function(err, response, body) {
  if (err) {
    console.log('error:', err);

  } else {
    console.log('body:', body);
  }
});

