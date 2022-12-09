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
  e.preventDefault();
  validate();
  //https://codepen.io/realdevgarg/pen/NWRrKvd
  if (validate() == true) {
    addBook();
    renderTable(bookCollection);
    bookModal.hide();
  }
  //let bookNum = addBook();
  //let ratingNum = addRating(bookNum);
  //addTableRow(bookNum, ratingNum);

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
  
  titleField.parentElement.classList.remove('error');
  authorField.parentElement.classList.remove('error');
  genreField.parentElement.classList.remove('error');
  readerField.parentElement.classList.remove('error');
  raterField.parentElement.classList.remove('error');

  // let smallErrors = document.querySelectorAll('small');
  // smallErrors.forEach((error) => error.style.visibility = "hidden");
}


function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "mb-2 error";
  let small = formControl.querySelector("small");
  small.innerHTML = message;
}

function validate() {
  if (readerField.value.trim() === "" ||
      titleField.value.trim() === "" ||
      authorField.value.trim() === "" ||
      genreField.value === "none" ||
      raterField.value === "none") {
        if (readerField.value.trim() === "") {
          setErrorFor(readerField, "We wanna know who you are");
        }
        if (titleField.value.trim() === "") {
          setErrorFor(titleField, "Title can't be blank");
        }
        if (authorField.value.trim() === "") {
          setErrorFor(authorField, "Give the writer some credit here");
        }
        if (genreField.value === "none") {
          setErrorFor(genreField, "Genres are hard, but give it your best shot");
        }
        if (raterField.value === "none") {
          setErrorFor(raterField, "Go with your gut");
      }
      return false;
  }
  else return true;
}