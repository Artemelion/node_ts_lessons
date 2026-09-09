import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { books } from "./data/books.js";
import { showAllBooks, showBook } from "./utils/showBooks.js";
import type { BookType } from "./types/BookType.js";

const PORT: number = 4200;

const PATH_TO_PAGES = path.join("src", "pages");
const PATH_TO_STYLES = path.join("src", "styles");
const PATH_TO_IMAGES = path.join("src", "images");

const sendHtml = (res: http.ServerResponse, content: string | Buffer) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(content);
};

const sendJson = (res: http.ServerResponse, content: unknown, statusCode = 200) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(content));
};



const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? `localhost:${PORT}`}`);

   if(req.method==="GET" && url.pathname==='/books')
{
    const books_content:string = showAllBooks(books)

    sendHtml(res, books_content)
    return
}



if (req.method === "GET" && (url.pathname === "/book" || url.pathname === "/book/")) {
  const id: number = Number(url.searchParams.get("id"));

  const book: BookType | undefined = books.find((book) => book.id === id);

  if (!book) {
    res.statusCode = 404;
    sendHtml(res, "<h1>Book not found</h1>");
    return;
  }

  sendHtml(
    res,
    `<html><head><link rel="stylesheet" href="/book.css"></head><body><div class="container">${showBook(book)}</div></body></html>`,
  );
  return;
}





  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(PATH_TO_PAGES, "index.html");
    const content = fs.readFileSync(filePath);

    sendHtml(res, content);
    return;
  }

  if (req.method === "GET" && req.url === "/about") {
    const filePath = path.join(PATH_TO_PAGES, "about.html");
    const content = fs.readFileSync(filePath);

    sendHtml(res, content);
    return;
  }

  if (req.method === "GET" && path.extname(url.pathname) === ".css") {
  const fileName = path.basename(url.pathname);
  const filePath = path.join(PATH_TO_STYLES, fileName);

  const content = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "text/css; charset=utf-8");
  res.end(content);
  return;
}


    if (req.method === "GET" && path.extname(url.pathname) === ".jpg") {
  const fileName = path.basename(url.pathname);
  const filePath = path.join(PATH_TO_IMAGES, fileName);

  const content = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "image/jpeg");
    res.end(content);
    return;
}

  if (req.method === "POST" && url.pathname === "/books") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const bookData = JSON.parse(body) as Partial<BookType>;

        if (!bookData.title || bookData.price === undefined) {
          sendJson(res, { error: "Title and price are required" }, 400);
          return;
        }

        const book: BookType = {
          id: books.length + 1,
          title: bookData.title,
          price: Number(bookData.price),
          is_active: Boolean(bookData.is_active),
          image: bookData.image ?? "img1.jpg",
        };

        books.push(book);

        sendJson(res, book, 201);
      } catch {
        sendJson(res, { error: "Invalid JSON" }, 400);
      }
    });

    return;
  }

  if (req.method === "PUT") {
    sendHtml(res, `Ти хочеш оновити дані. Request: ${req.method}`);
    return;
  }


  res.statusCode = 404;
  sendHtml(res, "<h1>404 Not Found</h1>");
});

server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} has been started...`);
});
