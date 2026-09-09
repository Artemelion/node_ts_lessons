import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT: number = 4200;

const PATH_TO_PAGES = path.join("src", "pages");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(PATH_TO_PAGES, "index.html");
    const content = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(content);
    return;
  }

  if (req.method === "GET" && req.url === "/about") {
    const filePath = path.join(PATH_TO_PAGES, "about.html");
    const content = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(content);
    return;
  }

  if (req.method === "GET" && req.url && path.extname(req.url) === ".css") {
  const fileName = path.basename(req.url);
  const filePath = path.join("src", "styles", fileName);

  const content = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "text/css; charset=utf-8");
  res.end(content);
  return;
}

    if (req.method === "GET" && req.url && path.extname(req.url) === ".jpg") {
  const fileName = path.basename(req.url);
  const filePath = path.join("src", "images", fileName);

  const content = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "image/jpeg");
  res.end(content);
  return;
}


  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h1>404 Not Found</h1>");
});

server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} has been started...`);
});