let activeBookLibrary = [];
const displayBooksButton = document.querySelector('.display-button');
const addButton = document.querySelector('.add-button');
const bookList = document.querySelector('.book-list');
const popUpForm = document.querySelector('.form-popup');
const popUpSubmit = document.querySelector('.submit');

popUpForm.style.display = 'none';
let allActiveBookDivs;
let books;
const html = document.querySelector('html');
let deleteButtons;
let readButtons;

function Book(title, author, genre, pages, read = false) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

function getBookFromTitle(form) {
  return activeBookLibrary.find((book) => {
    return book.title === form.childNodes[1].childNodes[1].value;
  });
}

// Always update the DOM element classes.
html.addEventListener('mouseover', (e) => {
  allActiveBookDivs = document.querySelectorAll('.active-book'); // get all displayed books
  deleteButtons = document.querySelectorAll('.delete-button'); // get all delete buttons
  readButtons = document.querySelectorAll('.read');

  readButtons.forEach((button) => {
    if (!button.classList.contains('active')) {
      if (!button.parentElement.classList.contains('active-book')) {
        button.classList.add('off');
        button.style.backgroundColor = 'red';
      }

      button.classList.add('active');
      button.addEventListener('click', () => {
        let book = findBookInArray(button);
        if (button.parentNode.classList.contains('active-book'))
          book.read = !book.read;

        if (button.classList.contains('on')) {
          button.classList.remove('on');
          button.classList.add('off');
          button.style.backgroundColor = 'red';
        } else if (button.classList.contains('off')) {
          button.classList.remove('off');
          button.classList.add('on');
          button.style.backgroundColor = 'green';
        }
      });
    }
  });

  // For every delete button on the DOM
  deleteButtons.forEach((button) => {
    // If it isn't active, make it active and add a click listener
    if (!button.classList.contains('active')) {
      button.classList.add('active');
      button.addEventListener('click', () => {
        removeBookFromDOM(button);
      });
    }
  });
});

// Prevent submit button default behavior
popUpSubmit.addEventListener('click', function (event) {
  event.preventDefault();
});

// Listener for pop up submit algorithm. To get book data and display.
popUpSubmit.addEventListener('click', () => {
  const currentEmptyBook = createBook(); // Create an empty book object.
  currentBookData = getBookInfoFromUserInput(currentEmptyBook);
  if (!currentBookData.hasOwnProperty('title')) delete currentBookData;
  else {
    addBookToLibrary(currentBookData);
    closeForm();
    populateBookToBookList(currentBookData); // Visually add the book to the list.
    // Querey all displayed books.
  }
});

// Open popup form on click from add button
addButton.addEventListener('click', (e) => {
  openForm();
});

displayBooksButton.addEventListener('click', displayAllBooks);

// Add book to library array
function addBookToLibrary(book) {
  activeBookLibrary.push(book);
}

function deleteBookFromLibrary(activeLibrary, startIndex, numberOfItems = 1) {
  activeBookLibrary.splice(startIndex, numberOfItems);
}

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

// Get data from form inputs, return it.
function getBookInfoFromUserInput(book) {
  let bookInfoInputs = document.querySelectorAll('input');
  book.title = bookInfoInputs[0].value;
  book.author = bookInfoInputs[1].value;
  book.pages = bookInfoInputs[2].value;
  book.genre = bookInfoInputs[3].value;
  book.read = bookInfoInputs[4].value;
  if (bookInfoInputs[4].classList.contains('on')) {
    book.read = true;
  } else if (bookInfoInputs[4].classList.contains('off')) {
    book.read = false;
  }

  for (const [key, value] of Object.entries(book)) {
    if (value === '') {
      closeForm();
      return {};
    }
  }

  console.log(bookInfoInputs);
  return book;
}

// Create and Fill in the inner data for the current book.
function createBookDataDivs(bookDiv, currentBookData) {
  for (let i = 0; i < Object.keys(currentBookData).length; i++) {
    if (i === 4) {
      const rd = document.createElement('button');
      rd.classList.add(`data-div${i}`);
      rd.classList.add('read');
      let readWrap = document.querySelector('.read-wrap');
      rd.style.backgroundColor = `${readWrap.childNodes[3].style.backgroundColor}`;
      rd.classList.add(`${readWrap.childNodes[3].classList[2]}`);
      bookDiv.appendChild(rd);
    } else {
      const currentBookDataDiv = document.createElement('div');
      currentBookDataDiv.classList.add(`data-div${i}`);
      currentBookDataDiv.textContent = `${Object.values(currentBookData)[i]}`;
      bookDiv.appendChild(currentBookDataDiv);
    }
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

  deleteBookFromLibrary(activeBookLibrary, index);
  button.parentNode.remove();
}

// Find Book object in library from delete button. POSSIBLE ERROR HERE!
function findBookInArray(button) {
  return activeBookLibrary.find(
    (element) => element.title === button.parentNode.childNodes[0].innerHTML
  );
}

// Popup form becomes visible
function openForm() {
  popUpForm.style.display = 'flex';
  setFormInputsToEmpty();
}

// Remove form from DOM visibility.
function closeForm() {
  popUpForm.style.display = 'none';
}

// Default inputs to empty
function setFormInputsToEmpty() {
  let bookInfoInputs = document.querySelectorAll('input');
  bookInfoInputs.forEach((inputField) => {
    inputField.value = '';
  });
}
