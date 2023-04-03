let myLibrary = [];

function Book(title, author, genre) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

function addBookToLibrary(book) {
  if (book !== undefined) myLibrary.push(book);
}

function displayAllBooks() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
}

// Check methods are working.
const book1 = new Book("a", "b", "c");
const book2 = new Book("c", "d", "e");

addBookToLibrary(book1);
addBookToLibrary(book2);
console.log(myLibrary);

displayAllBooks();
