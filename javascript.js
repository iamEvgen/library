// VARIABLES
let myLibrary = [];

// DOC ELEMENTS
const modal = document.querySelector('.modal');
const closeField = document.querySelector('.closeField')
const modalBox = document.querySelector('.modalBox');
const addButton = document.querySelector('.addBook');
const saveButton = document.querySelector('#saveButton');

// FUNCTIONS
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary() {
  // do stuff here
}

function openPopupForm() {
  closeField.classList.remove('hidden');
  closeField.classList.add('show');
  modalBox.classList.remove('hidden');
  modalBox.classList.add('show');
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

function closePopupForm() {
  closeField.classList.remove('show');
  closeField.classList.add('hidden');
  modalBox.classList.remove('show');
  modalBox.classList.add('hidden');
  modal.classList.remove('show');
  modal.classList.add('hidden');
}

const book1 = new Book('title1', 'author1', 'pages1', 'already read?', 1);
myLibrary.push(book1);

const book2 = new Book('title2', 'author2', 'pages2', 'already read?', 2);
myLibrary.push(book2);

const book3 = new Book('title1', 'author3', 'pages3', 'already read?', 3);
myLibrary.push(book3);

const book4 = new Book('title1', 'author3', 'pages3', 'already read?', 3);
myLibrary.push(book4);

const book5 = new Book('title1', 'author3', 'pages3', 'already read?', 3);
myLibrary.push(book5);

const book6 = new Book('title1', 'author3', 'pages3', 'already read?', 3);
myLibrary.push(book6);

const book7 = new Book('asdfl;jadsf ;lkasdf ;lkjadsf kljsdf l;kajdf io;qjlwe', 'author3', 'pages3', 'already read?', 3);
myLibrary.push(book7);





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
  pages.textContent = book.pages;
  const read = document.createElement('div');
  read.className = 'read';
  read.textContent = book.read;
  const delButton = document.createElement('button');
  delButton.className = 'delButton';
  delButton.textContent = 'Delete';
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(delButton);
  insertCard(card)
}

function insertCard(card) {
  const cards = document.querySelector('.cards');
  cards.appendChild(card);
}

for (let book of myLibrary) {
  createCard(book);
}

// Event listeners
window.onclick = function(event) {
  if (event.target == closeField) {
    closePopupForm();
  }
}

addButton.addEventListener('click', () => {
  openPopupForm();
});


