import bookCollection, {tableBody} from '/main.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';

function clearTable() {
    for (let i = 1; i < tableBody.rows.length; i++) {
        tableBody.deleteRow(i);
    }
}

function populateCells(value, newCell) {
    let newCellValue = document.createTextNode(value);
    newCell.appendChild(newCellValue);
  }

export function renderTable(array) {
    clearTable();
    array.forEach((book) => {
      let newRow = document.createElement("tr");
  
      let ratingButtonCell = newRow.insertCell(0);
      let button = newRatingButton(book.id);
      ratingButtonCell.appendChild(button);
  
      let newTitleCell = newRow.insertCell(1);
      populateCells(book.title, newTitleCell);
  
      let newAuthorCell = newRow.insertCell(2);
      populateCells(book.author, newAuthorCell);
  
      let newGenreCell = newRow.insertCell(3);
      populateCells(book.genre, newGenreCell);

      let newReaderCell = newRow.insertCell(4);
      populateCells(book.ratings[0].reader, newReaderCell);

      let newRatingCell = newRow.insertCell(5);
      populateCells(book.ratings[0].rating, newRatingCell);

      let commentValue = book.ratings[0].comments;
      if (commentValue != '') {
            createCommentModal(newRatingCell, commentValue)
            }
      tableBody.appendChild(newRow);
      if(book.ratings.length > 1) {
        for (let i = 1; i < book.ratings.length; i++) {
            let newRatingRow = tableBody.insertRow(-1);
            for (let j = 0; j < 4; j++) {
                newRatingRow.insertCell(j)
                let rows = 1 + i;
                //make the first 3 cells of book row, span num of rows 
                newRow.cells[j].setAttribute("rowspan", String(rows));
            }
            let newReader = newRatingRow.insertCell(0);
            populateCells(book.ratings[i].reader, newReader);

            let newRate = newRow.insertCell(1);
            populateCells(book.ratings[i].rating, newRate);
        }
      }
        })
    let allRatingButtons = document.querySelectorAll(".rate-button");
    addRatingListener(allRatingButtons);
  }



  function checkNumRatings(bookNum) {
    return bookCollection[bookNum].ratings.length;
  }

  function newRatingButton(bookNum) {
    let button = document.createElement("button");
    button.innerHTML = "add rating";
    button.classList = "btn btn-primary rate-button";
    button.type = "button";
    button.id = bookNum;
    return button;
  }

  export const ratingModal = new bootstrap.Modal(
    document.getElementById("ratingModal"),
    {}
  );

  function addRatingListener(buttons) {
    buttons.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        clearRatingModal();
        ratingModal.show();
        let modal = document.querySelector('.modal-content');
        modal.classList.add('rating-modal-open');
        modal.id = btn.id;
        console.log(modal);
      })
    );
  }

  function createCommentModal(tableCell, commentValue) {
    let commentsModal = new bootstrap.Modal(document.getElementById('commentsModal'), {});
    let comments = document.querySelector('#commentsModal .modal-body');
    let p = document.createElement('p');
    comments.appendChild(p);
    p.appendChild(document.createTextNode(commentValue));
    let br = document.createElement('br');
    tableCell.appendChild(br);
    let commentLink = document.createElement('a');
    commentLink.innerHTML = "View comments";
    commentLink.style.fontSize = '12px';
    commentLink.style.color = 'blue';
    commentLink.style.textDecorationLine = 'underline';
    tableCell.appendChild(commentLink);
    commentLink.addEventListener('click', function() {
        commentsModal.show();
        })
  }

  function clearRatingModal() {
    document.querySelector("#rating-reader").value = "";
    document.querySelector("#rating-rating").value = "none";
    document.querySelector("#rating-comments").value = "";
    }