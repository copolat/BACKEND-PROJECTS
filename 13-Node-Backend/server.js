let express=require('express');
let cors=require('cors');
let bodyParser=require('body-parser');
let router = require("./app/routers/db.routers");

let app = express();
let port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


require("./config/db.config");
app.use('/api/customers', router);
app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 

