import {addBook, addRating} from './books.js';
import { renderTable, ratingModal } from './table.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';

//array to store bookObjects (books + ratings)
let bookCollection = [];
export default bookCollection;

//select table
let table = document.querySelector("#favoriteBooks");
export let tableBody = table.getElementsByTagName("tbody")[0];

//add new books
const addBookButton = document.querySelector("#addBook");
addBookButton.addEventListener("click", function () {
  clearBookModal();
  bookModal.show();
});
const bookModal = new bootstrap.Modal(
  document.getElementById("addBookModal"),
  {}
);

//book modal fields
let titleField = document.querySelector("#title");
let authorField = document.querySelector("#author");
let genreField = document.getElementById("genre");
let readerField = document.querySelector("#reader");
let raterField = document.querySelector("#rating");
let commentField = document.querySelector("#comments");

const submitBookButton = document.querySelector("#submit-book");
submitBookButton.addEventListener("click", function (e) {
  //https://codepen.io/realdevgarg/pen/NWRrKvd
  validate();
  addBook();
  //let bookNum = addBook();
  //let ratingNum = addRating(bookNum);
  //addTableRow(bookNum, ratingNum);
  renderTable(bookCollection);
  bookModal.hide();
});

//add new rating
const submitRatingButton = document.querySelector("#submit-rating");
submitRatingButton.addEventListener("click", function (e) {
  let bookNum = document.querySelector('.rating-modal-open').id;
  addRating(bookNum - 1);
  renderTable(bookCollection);
  console.log(bookCollection);
  ratingModal.hide();
});

function clearBookModal() {
  titleField.value = "";
  authorField.value = "";
  genreField.value = "none";
  readerField.value = "";
  raterField.value = "none";
  commentField.value = "";
}

function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "form-control error";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

function validate() {
  //  Checking for username
  if (titleField.value === "") {
    setErrorFor(titleField, "We need to know the title!");
  }
  if (authorField.value === "") {
    setErrorFor(authorField, "We need to know the author!");
  }
}
 