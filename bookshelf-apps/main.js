// form elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const isComplete = document.getElementById("is-complete");
const submitBtn = document.querySelector("button[type=submit]");

// book list container
const completeList = document.getElementById("complete-list");
const incompleteList = document.getElementById("incomplete-list");

let bookShelf = [];

submitBtn.addEventListener("click", e => e.preventDefault());
submitBtn.addEventListener("click", addBook);


// get `book-shelf` from localStorage 
window.onload = () => {
  if (!(bookShelf_ = JSON.parse(localStorage.getItem("book-shelf")))) {
    updateBookShelf();
    return;
  }

  bookShelf = bookShelf_;
  updateList();
}


function addBook() {
  // generate id
  const id = (new Date()).getTime().toString();

  // push to bookShelf object
  bookShelf.push({
    id,
    title: title.value,
    author: author.value,
    year: year.value,
    status: isComplete.checked
  });

  updateBookShelf();
  updateList();

  // empty the form input
  title.innerText = '';
  author.innerText = '';
  year.innerText = '';
}


function moveBook(book) {
  // ( data-id="{id}" )
  const id = book.dataset.id;

  // toggle status for selected book
  bookShelf.forEach(book => {
    if (book.id === id) book.status = !book.status;
  });

  // update bookShelf object
  bookShelf = bookShelf;

  updateBookShelf();
  updateList();
}


function deleteBook(book){
  // ( data-id="{id}" )
  const id = book.dataset.id;

  // drop the selected book
  bookShelf = bookShelf.filter(book => book.id !== id);

  updateBookShelf();
  updateList();
}


// update `book-shelf` in localStorage
function updateBookShelf() {
  localStorage.setItem("book-shelf", JSON.stringify(bookShelf));
}


// update book list container
function updateList() {
  completeList.innerHTML = renderBook(bookShelf, true);
  incompleteList.innerHTML = renderBook(bookShelf, false);
}


// render each book
function renderBook(shelf, complete) {
  let btnClass, btnText;
  btnClass = complete ? "green" : "orange";
  btnText = complete ? "Selesai dibaca" : "Belum selesai dibaca";

  let html = '';
  shelf.filter(book => book.status === complete).forEach(book => {
    html += `<article class="book-item">
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun: ${book.year}</p>

      <div class="action">
        <button class="${btnClass}" data-id="${book.id}" onclick="moveBook(this)">
          ${btnText}
        </button>
        <button class="red" data-id="${book.id}" onclick="deleteBook(this)">Hapus buku</button>
      </div>
    </article>`;
  });
  return html;
}

