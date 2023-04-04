let activeBookLibrary = [];
const displayBooksButton = document.querySelector('button');
const addButton = document.querySelector('.add-button');
const bookList = document.querySelector('.book-list');

const book1 = new Book('Title', 'Author', 'Genre', 500);
const book2 = new Book('c', 'd', 'e', 0);

function Book(title, author, genre, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  activeBookLibrary.push(book);
}

function displayAllBooks() {
  console.table(activeBookLibrary);
}

addBookToLibrary(book1);
addBookToLibrary(book2);
displayBooksButton.addEventListener('click', displayAllBooks);

addButton.addEventListener('click', (e) => {
  const currentEmptyBook = createBook(); // Create an empty book object.

  const currentBookData = fillOutBookInfo(currentEmptyBook); // Ask user to fill out book data.
  console.log(currentBookData);
  addBookToLibrary(currentBookData);
  populateBookToBookList(currentBookData); // Visually add the book to the list.
});

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
  bookDiv.classList.add('book');
  bookDiv.classList.add('active');
  createBookDataDivs(bookDiv, currentBookData);
  return bookDiv;
}

// Fill out book data, return it.
function fillOutBookInfo(book) {
  book.author = 'Roald Dahl';
  book.title = 'James and the Giant Peach';
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
}
