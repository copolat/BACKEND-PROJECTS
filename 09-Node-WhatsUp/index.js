/*** Required External Modules */
const express = require('express')
const path = require('path')

/*** App Variables */
const app = express()

/***  App Configuration */
const port = 8000
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")));
/*** Routes Definitions */
app.set("views", path.join(__dirname, "views"));
app.get('/', (req, res) => res.render("index", {title:'Home'}))
app.get("/user", (req, res) => {
  res.render("user", {title:"Profile", userProfile:{nickname:"Auth0"}});
});
app.get("/logout", (req, res) => {
  res.redirect("/");
});

/*** Server Activation */
app.listen(port, () => console.log(`Example app listening on port port!`))


