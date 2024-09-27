let message = require("./lab3/lang/en/en");
let http = require("http");
let url = require("url");
let fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    console.log("Incoming request:", req.url);
    let q = url.parse(req.url, true);
    if (req.url === "/") {
      fs.readFile(path.join(__dirname, './lab3/index.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }
    else if (req.url.startsWith("/COMP4537/lab3/getDate")) {
      let name = q.query.name;
      let date = new Date();
      // format date and time to PST
      date.setHours(date.getHours() - 7);
      date = date.toISOString().replace(/T/, " ").replace(/\..+/, "");
      let greeting = message.greeting(name, date);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1 style="color:blue">${greeting}</h1>`);
    } else if (req.url.startsWith("/COMP4537/lab3/writeFile")) {
      let text = q.query.text;

      if (text) {
        fs.appendFile("file.txt", text + "\n", (err) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("Text written to file");
        });
      }
    } else if (req.url.startsWith("/COMP4537/lab3/readFile")) {
        const filename = path.basename(req.url);
        fs.readFile(filename, (err, data) => {
            if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  })
  .listen(process.env.PORT || 8080, () => {
    console.log("Server is running...");
  });
