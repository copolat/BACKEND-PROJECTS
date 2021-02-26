const express = require('express')
const router = require("./app/routers/db.routers");
const app = express()
const port = 5000
const cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./config/db.config')
app.use('/api/customers', router);


// let corsOptions = {
//   origin: '*',   //This is for frontend
//   optionsSuccessStatus: 200 // For legacy browser support

// };

// app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });






app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port} !`))