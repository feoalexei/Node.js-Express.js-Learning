const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;
function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-type': 'text/plain' });
      return res.end('500 — Внутренняя ошибка');
    }
    res.writeHead(responseCode, { 'Content-type': contentType });
    res.end(data);
  });
}
const server = http.createServer((req, res) => {
  // Приводим URL к единому виду, удаляя
  // строку запроса, необязательную косую черту
  // в конце строки и переводя в нижний регистр.
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;
    case '/img/logo.png':
      serveStaticFile(res, '/public/img/logo.png', 'image/png');
      break;
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404);
      break;
  }
});
server.listen(port, () =>
  console.log(
    `сервер запущен на порте ${port}; ` + 'нажмите Ctrl+C для завершения...'
  )
);
