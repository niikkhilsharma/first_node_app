const http = require("http");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 5000;

http
  .createServer((req, res) => {
    /* if (req.url === "/") {
      fs.readFile(
        path.join(__dirname, "public", "index.html"),
        (err, content) => {
          //reading a file returns 2 parameters error and another is the content or data of the file which is read
          if (err) throw err;
          res.writeHead(200, { "Text-Content": "text/html" });
          res.end(content);
        }
      );
    } else if (req.url === "/about") {
      fs.readFile(
        path.join(__dirname, "public", "about.html"),
        (err, content) => {
          if (err) throw err;
          //here we are setting the status of the page 200 which means everything is ok and telling the webpage that we are
          //delivering content-type which is text or html.
          res.writeHead(200, { "Text-Content": "text/html" });
          res.end(content);
        }
      ); //suppose you need to send data through an api
    } else if (req.url === "/api/users") {
      const users = [
        { name: "bob", age: "40" },
        { name: "john", age: "30" },
      ];
      res.writeHead(200, { "Text-Content": "appliation/json" });
      //converting the users array into json string and sending as response.
      res.end(JSON.stringify(users));
    } */
    console.log(req.url);

    const filePath = path.join(
      __dirname,
      "public",
      req.url === "/" ? "/index.html" : req.url
    );

    //taking extension out of the requested file path
    //we are taking the extention from the file that is being send in order to set the header of the
    //page according to that filePath extention. So that the page/browser can recieve the sent file.
    const extname = path.extname(filePath);

    let contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }

    fs.readFile(filePath, (err, content) => {
      //err.code ==='ENOENT' this error comes when requested page is not found
      if (err) {
        if (err.code === "ENOENT") {
          //page not found
          fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, content) => {
              if (err) throw err;
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(content, "utf-8");
            }
          );
        } else {
          //some server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  })
  .listen(port, () => {
    console.log("server running");
  });
