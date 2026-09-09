import { BookType } from "../types/BookType.js";

const books: BookType[] = [
  {
    id: 1,
    title: "Clean Code",
    price: 1005,
    is_active: true,
    image: "img1.jpg",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    price: 1200,
    is_active: true,
    image: "img2.jpg",
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    price: 700,
    is_active: false,
    image: "img3.jpg",
  },
  {
    id: 4,
    title: "Design Patterns",
    price: 1500,
    is_active: true,
    image: "img1.jpg",
  },
  {
    id: 5,
    title: "You Don't Know JS",
    price: 850,
    is_active: false,
    image: "img2.jpg",
  },
];

export { books };