// VARIABLES
let myLibrary = [];
let idsCounter = 3;
let delButtons;
let readOrNotDivs;

// DOC ELEMENTS
const cards = document.querySelector('.cards');
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modalBox');
const addButton = document.querySelector('.addBook');
// const saveButton = document.querySelector('#saveButton');
const inputTitle = document.getElementById('inputTitle');
const inputAuthor = document.getElementById('inputAuthor');
const inputPages = document.getElementById('inputPages');
const inputReadOrNot = document.querySelector('#inputReadOrNot');
let reads = document.querySelectorAll('.read');  // div прочитана книга или нет


// FUNCTIONS
function Book(title, author, pages, inputReadOrNot, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readOrNot = inputReadOrNot;
  this.id = id;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const addTitle = inputTitle.value;
  const addAuthor = inputAuthor.value;
  const addPages = inputPages.value;
  let addRead;
  inputReadOrNot.checked ? addRead = '✓ Allready read' : addRead = '✖ Not read';
  if (addTitle.length <= 300 && addAuthor.length <= 300 && addPages <= 2000) {
    const book = new Book(addTitle, addAuthor, addPages, addRead, idsCounter);
    idsCounter++;
    myLibrary.push(book);
    drawCards();
    closePopupForm();
  }
}

function clearInputs() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  inputReadOrNot.checked = false;
}

function openPopupForm() {
  clearInputs();
  modalBox.classList.remove('hidden');
  modalBox.classList.add('show');
  modal.classList.remove('hidden');
  modal.classList.add('show');
  modal.classList.remove('opacity0');
  modal.classList.add('opacity1');
}

function closePopupForm() {
  modalBox.classList.remove('show');
  modalBox.classList.add('hidden');
  modal.classList.remove('show');
  modal.classList.add('hidden');
  modal.classList.remove('opacity1');
  modal.classList.add('opacity0');
}

// добавление книг для теста, удалить, когда будет готово, глобальный счетчик перевести в 0
const book1 = new Book('Don Quixote', 'Miguel de Cervantes', '320', '✓ Allready read', 0);
myLibrary.push(book1);
const book2 = new Book('Moby Dick', 'Herman Melville', '800', '✓ Allready read', 1);
myLibrary.push(book2);
const book3 = new Book('War and Peace', 'Leo Tolstoy', '1300', '✖ Not read', 2);
myLibrary.push(book3);

function createCard(book) {
  const card = document.createElement('div');
  card.className = 'card';
  card.classList.add(`id-${book.id}`);
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = book.title;
  const author = document.createElement('div');
  author.className = 'author';
  author.textContent = book.author;
  const pages = document.createElement('div');
  pages.className = 'pages';
  pages.textContent = `pages: ${book.pages}`;
  const read = document.createElement('div');
  read.className = 'read';
  read.textContent = book.readOrNot;
  setColor(read);
  const delButton = document.createElement('button');
  delButton.className = 'delButton';
  delButton.textContent = 'Delete';
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(delButton);
  insertCard(card);
}

function insertCard(card) {
  cards.appendChild(card);
}

function prepareDelButtons() {
  delButtons = document.querySelectorAll('.delButton');
  delButtons.forEach(element => {
    element.addEventListener('click', deleteCard);
  });
}

function prepareReadOrNotDivs() {
  readOrNotDivs = document.querySelectorAll('.read');
  readOrNotDivs.forEach(element => {
    element.addEventListener('click', changeReadOrNot);
  });
}

function changeReadOrNot(event) {
  const path = event.path || (event.composedPath && event.composedPath());
  const id = path[1].className.split(' ')[1];
  const fieldWithRead = document.querySelector(`.${id} .read`);
  changeText(fieldWithRead);
  setColor(fieldWithRead);
}

function changeText(fieldWithRead) {
  fieldWithRead.textContent === '✓ Allready read' ? 
  fieldWithRead.textContent = '✖ Not read' : 
  fieldWithRead.textContent = '✓ Allready read';
}

function setColor(fieldWithRead) {
  if (fieldWithRead.textContent === '✖ Not read') {
    fieldWithRead.classList.remove('greenText');
    fieldWithRead.classList.add('redText');
  } else {
    fieldWithRead.classList.remove('redText');
    fieldWithRead.classList.add('greenText');
  }
}

function drawCards() {
  cards.innerHTML = '';
  for (let book of myLibrary) {
    createCard(book);
  }
  prepareDelButtons();
  prepareReadOrNotDivs();
}

function deleteCard(event) {
  const path = event.path || (event.composedPath && event.composedPath());
  const idToDelete = path[1].classList[1].split('-')[1];
  console.log(idToDelete);
  myLibrary = myLibrary.filter((card) => {
    return card.id != idToDelete;
  });
  drawCards();
}

// Event listeners
window.onclick = function(event) {
  if (event.target == modal) {
    closePopupForm();
  }
}

addButton.addEventListener('click', () => openPopupForm());
// saveButton.addEventListener('click', addBookToLibrary);
modalBox.addEventListener('submit', addBookToLibrary)

drawCards();