const http = require('http');
const host = 'localhost';
const port = 5000;

const requestListener = function(req, res) {
  
  res.setHeader("Content-Type", "text/html");
  if (req.url === '/student'){
    res.end(`This is STUDENT page`);
  }else if (req.url === '/teacher'){
    res.end(`This is TEACHER page`);
  }else if (req.url === '/principal'){
    res.end(`This is PRINCIPAL page`);
  }else if (req.url === '/admin'){
    res.end(`This is ADMIN page`);
  }else if (req.url === '/data'){
    res.setHeader("Content-Type", "application/json");
    res.end(`{"message": "This is a message from webserver"}`);
  }else {
    res.end(`Hello World!`);
  }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  
  console.log(`Server is running on http://${host}:${port}`);
})