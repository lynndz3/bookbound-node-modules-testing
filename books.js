import bookCollection from "./main.js";

class Book {
    constructor(id, title, author, genre) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.genre = genre;
      //each book can have multiple readers/ratings
      this.ratings = [];
    }
  }

  export function addBook() {
    let newBook = new Book();
    newBook.id = bookCollection.length + 1;
    newBook.title = document.querySelector("#title").value;
    newBook.author = document.querySelector("#author").value;
    let allGenres = document.getElementById("genre");
    newBook.genre = allGenres.options[allGenres.selectedIndex].text;
    bookCollection.push(newBook);
    let newRating = {};
    newRating.reader = document.querySelector("#reader").value;
    let allRatings = document.querySelector("#rating");
    newRating.rating = allRatings.options[allRatings.selectedIndex].text;
    newRating.comments = document.querySelector("#comments").value;
    bookCollection[newBook.id - 1].ratings.push(newRating);
    return bookCollection[newBook.id - 1].ratings.length - 1;
  }

  export function addRating(bookNum) {
    let newRating = {};
    newRating.reader = document.querySelector("#rating-reader").value;
    let allRatings = document.querySelector("#rating-rating");
    newRating.rating = allRatings.options[allRatings.selectedIndex].text;
    newRating.comments = document.querySelector("#rating-comments").value;
    bookCollection[bookNum].ratings.push(newRating);
    return bookCollection[bookNum].ratings.length - 1;
  }