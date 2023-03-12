const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holden');
});

server.listen(port, () =>
  console.log(
    `server was started on ${port} port; ` + 'enter Ctrl + C to terminate...'
  )
);
