const express = require('express');
const app = express();
const host = 'localhost';
const port = 3636;

app.get('/', (request, response)=>{
  response.send('<h1>Hello World</h1>')
})
app.get('/about', (request, response)=>{
  response.send('<h1>This is about page</h1>')
})
app.get('/hobbies', (request, response)=>{
  response.send(`<h1>Hobbies</h1>
    <h3>
      <ul>
        <li>Play Chess</li>
        <li>Play Football</li>
        <li>Watch movies</li>
        <li>Dine outside</li>
      </ul>
    </h3>
  `)
});
app.get('/friends', (req, res) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });
 



app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
})