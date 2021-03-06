const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routerCustomer = require("./app/routers/db.routers");


const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./config/db.config");
require('./app/routers/auth.routes')(app);
require('./app/routers/user.routes')(app);
app.use("/api/customers", routerCustomer);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
