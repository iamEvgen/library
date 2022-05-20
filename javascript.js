/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
// eslint-disable-next-line func-names
(function () {
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
  const inputTitle = document.getElementById('inputTitle');
  const inputAuthor = document.getElementById('inputAuthor');
  const inputPages = document.getElementById('inputPages');
  const inputReadOrNot = document.querySelector('#inputReadOrNot');

  class Book {
    constructor(title, author, pages, readOrNot, id) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.readOrNot = readOrNot;
      this.id = id;
    }

    createCard() {
      const card = document.createElement('div');
      card.className = 'card';
      card.classList.add(`id-${this.id}`);
      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = this.title;
      const author = document.createElement('div');
      author.className = 'author';
      author.textContent = this.author;
      const pages = document.createElement('div');
      pages.className = 'pages';
      pages.textContent = `pages: ${this.pages}`;
      const read = document.createElement('div');
      read.className = 'read';
      read.textContent = this.readOrNot;
      setColor(read);
      const delButton = document.createElement('button');
      delButton.className = 'delButton';
      delButton.textContent = 'Delete';
      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(pages);
      card.appendChild(read);
      card.appendChild(delButton);
      return card;
    }
  }

  function addBookToLibrary(event) {
    event.preventDefault();
    const addTitle = inputTitle.value;
    const addAuthor = inputAuthor.value;
    const addPages = inputPages.value;
    let addRead;
    if (inputReadOrNot.checked) {
      addRead = '✓ Allready read';
    } else {
      addRead = '✖ Not read';
    }
    if (addTitle.length <= 300 && addAuthor.length <= 300 && addPages <= 2000) {
      const book = new Book(addTitle, addAuthor, addPages, addRead, idsCounter);
      idsCounter += 1;
      myLibrary.push(book);
      renderCards();
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

  const book1 = new Book(
    'Don Quixote',
    'Miguel de Cervantes',
    '320',
    '✓ Allready read',
    0
  );
  myLibrary.push(book1);
  const book2 = new Book(
    'Moby Dick',
    'Herman Melville',
    '800',
    '✓ Allready read',
    1
  );
  myLibrary.push(book2);
  const book3 = new Book(
    'War and Peace',
    'Leo Tolstoy',
    '1300',
    '✖ Not read',
    2
  );
  myLibrary.push(book3);

  // function insertCard(card) {
  //   cards.appendChild(card);
  // }

  function prepareDelButtons() {
    delButtons = document.querySelectorAll('.delButton');
    delButtons.forEach((element) => {
      element.addEventListener('click', deleteCard);
    });
  }

  function prepareReadOrNotDivs() {
    readOrNotDivs = document.querySelectorAll('.read');
    readOrNotDivs.forEach((element) => {
      element.addEventListener('click', changeReadOrNot);
    });
  }

  function changeReadOrNot(event) {
    const path = event.composedPath && event.composedPath();
    const id = path[1].className.split('-')[1];
    for (const book of myLibrary) {
      if (+book.id === +id) {
        const readText = book.readOrNot;
        if (readText === '✓ Allready read') {
          book.readOrNot = '✖ Not read';
        } else {
          book.readOrNot = '✓ Allready read';
        }
      }
    }

    // setColor(fieldWithRead);
    renderCards();
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

  function renderCards() {
    cards.innerHTML = '';
    for (const book of myLibrary) {
      const card = book.createCard();
      cards.appendChild(card);
    }
    prepareDelButtons();
    prepareReadOrNotDivs();
  }

  function deleteCard(event) {
    const path = event.composedPath && event.composedPath();
    const idToDelete = path[1].classList[1].split('-')[1];
    myLibrary = myLibrary.filter((card) => card.id !== +idToDelete);
    renderCards();
  }

  // Event listeners
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closePopupForm();
    }
  });
  addButton.addEventListener('click', () => openPopupForm());
  modalBox.addEventListener('submit', addBookToLibrary);

  renderCards();
}());
