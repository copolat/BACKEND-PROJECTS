const express = require('express');
const app = express();
const host = 'localhost';
const port = 7000;

app.use(express.json());
app.use("/api/users", require("./routes/api/users"));

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
})