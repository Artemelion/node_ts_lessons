import { BookType } from "../types/BookType.js";

type ShowBookType = (book: BookType) => string;
type ShowAllBooksType = (books: Array<BookType>) => string;

const showBook: ShowBookType = (book) => {
  return `
    <div class="book-card">
      <div class="book-image">
        <img src="/${book.image ?? "img1.jpg"}" alt="${book.title}">
      </div>

      <div class="book-info">
        <span class="book-id">#${book.id}</span>

        <h2>${book.title}</h2>

        <p class="book-description">
          A powerful book for developers who want to write cleaner and better code.
        </p>

        <div class="book-bottom">
          <p class="book-price">${book.price} грн</p>

          <span class="${book.is_active ? "book-status active" : "book-status inactive"}">
            ${book.is_active ? "Available" : "Out of stock"}
          </span>
        </div>

        <div>

        <a href="/book/?id=${book.id}" class="book-button ${book.is_active ? "" : "disabled"}">
          ${book.is_active ? "Buy now" : "Unavailable"}
        </a>
      </div>
    </div>
    </div>
  `;
};

const showAllBooks: ShowAllBooksType = (books) => {
  let books_content: string = "";

  books.forEach((book, index) => {
    if (index === 0) {
      books_content += `<html><head><link rel="stylesheet" href="/book.css"></head><body><h1>Books Catalog</h1><div class="container">`;
    }

    books_content += showBook(book);
  });

  books_content += `</div></body></html>`;

  return books_content;
};

export { showAllBooks, showBook };
