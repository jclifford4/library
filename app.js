let activeBookLibrary = [];
const displayBooksButton = document.querySelector('button');
const addButton = document.querySelector('.add-button');
const bookList = document.querySelector('.book-list');
let allActiveBookDivs;
let books;
const html = document.querySelector('html');
let deleteButtons;
console.log(deleteButtons);

function Book(title, author, genre, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

html.addEventListener('mouseover', (e) => {
  books = document.querySelectorAll('.active-book');
  // console.log(books);
  if (books !== undefined) {
    books.forEach((book) => {
      book.addEventListener('mouseleave', () => {
        let bk = activeBookLibrary.find(
          (element) => element.title === book.childNodes[0].innerHTML
        );
        let index = activeBookLibrary.indexOf(bk);
        console.log(index);
        // if (bk !== -1)
        //   book.classList.replace(`${book.classList[1]}`, `book-${bk}`);
        // console.log(book.childNodes[0].innerHTML);
        // let first = book.classList[1];
        // console.log(bk);
        // let cls = book.classList[1].substring(0, 4) + `${bk}`;
        // book.classList.replace(`${first}`, `${cls}`);
        // console.log(cls);
      });
    });
  }
});

addButton.addEventListener('mouseleave', (e) => {
  deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      removeBookFromDOM(button);
    });
  });
});

addButton.addEventListener('click', (e) => {
  const currentEmptyBook = createBook(); // Create an empty book object.
  const currentBookData = fillOutBookInfo(currentEmptyBook); // Ask user to fill out book data.
  // console.log(currentBookData);
  addBookToLibrary(currentBookData);
  populateBookToBookList(currentBookData); // Visually add the book to the list.

  allActiveBookDivs = document.querySelectorAll('.active-book'); // Querey all displayed books.
});

displayBooksButton.addEventListener('click', displayAllBooks);

function addBookToLibrary(book) {
  activeBookLibrary.push(book);
}

function deleteBookFromLibrary(book) {}
function displayAllBooks() {
  console.table(activeBookLibrary);
}

// Create Empty Book
function createBook() {
  const currentBook = new Book();
  return currentBook;
}

// Add book to DOM
function populateBookToBookList(currentBookData) {
  const currentBookDiv = createBookDiv(currentBookData); // Create a new book div in the DOM.
  bookList.appendChild(currentBookDiv); // append to the DOM
}

// Create the Book Div, return it.
function createBookDiv(currentBookData) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('active-book');
  bookDiv.classList.add(
    `book-${activeBookLibrary.findIndex((book) => {
      return book === currentBookData;
    })}`
  );
  createBookDataDivs(bookDiv, currentBookData);
  return bookDiv;
}

// Fill out book data, return it.
function fillOutBookInfo(book) {
  book.author = 'Roald Dahl';
  book.title = `James and the Giant Peach${activeBookLibrary.length}`;
  book.genre = 'Fiction';
  book.pages = 160;
  book.read = true;
  return book;
}

// Create and Fill in the inner data for the current book.
function createBookDataDivs(bookDiv, currentBookData) {
  for (let i = 0; i < Object.keys(currentBookData).length; i++) {
    const currentBookDataDiv = document.createElement('div');
    currentBookDataDiv.classList.add(`data-div${i}`);
    currentBookDataDiv.textContent = `${Object.values(currentBookData)[i]}`;
    bookDiv.appendChild(currentBookDataDiv);
  }

  appendDeleteBookButtonToCurrentBookDiv(bookDiv);
}

// Add delete button to each book on the DOM.
function appendDeleteBookButtonToCurrentBookDiv(bookdiv) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = '❌';
  bookdiv.appendChild(deleteButton);
}

// Delete book from DOM
function removeBookFromDOM(button) {
  let book = findBookInArray(button);
  let index = activeBookLibrary.indexOf(book);
  // console.log(index);
  activeBookLibrary.splice(index, 1);
  button.parentNode.remove();
}

// Find Book object in library from delete button. POSSIBLE ERROR HERE!
function findBookInArray(button) {
  return activeBookLibrary.find(
    (element) => element.title === button.parentNode.childNodes[0].innerHTML
  );
}
