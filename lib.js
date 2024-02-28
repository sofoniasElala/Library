const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function (){
        let readString = 'not read yet';
        if(read) readString = 'read in full';

        return (`${this.title} by ${this.author}, ${this.pages} pages, ${readString}.`)
    }
}

/* testing data  --------------------------*/ 
let book = new Book('Dune', 'Frank Herbert', 896, true);
let book2 = new Book('Dune 2 ', 'Frank Herbert', 1896, true);
let book3 = new Book('Dune 3', 'Frank Herbert', 2896, true);

myLibrary[0] = book;
myLibrary[1] = book2;
myLibrary[2] = book3;
/*   --------------------------     */ 

const booksContainer = document.querySelector(".books");
function displayBooks(){
    for(let book of myLibrary){
        let index = myLibrary.indexOf(book);
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class', 'book');
        bookDiv.setAttribute('data-index', index);
        const title = document.createElement('p');
        title.textContent = 'Title: ' + book.title;
        const author = document.createElement('p');
        author.textContent = 'Author: ' + book.author;
        const pages = document.createElement('p');
        pages.textContent = 'Pages: ' + book.pages;
        const read = document.createElement('p');
        read.textContent = 'Read: ' + (book.read ? 'Yes' : 'No');

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(read);

        booksContainer.appendChild(bookDiv);
    }
}

displayBooks();

const addBookButton = document.querySelector('.add');
const dialog = document.querySelector('dialog');
const closeBookFormButton = document.querySelector('.close');
const form = document.querySelector('form');
addBookButton.addEventListener('click', () => {
    dialog.showModal();
})
closeBookFormButton.addEventListener('click', () => {
    dialog.close();
})

dialog.addEventListener('close', ()=>{
    let newBook = new Book(document.querySelector('#title').value, document.querySelector('#author').value,
    document.querySelector('#pages').value, document.querySelector('#read').checked);
    myLibrary.push(newBook);
    form.reset();
    addBookToDisplay(newBook);
})

function addBookToDisplay(book){
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'book');
    bookDiv.setAttribute('data-index', myLibrary.length - 1);
    const title = document.createElement('p');
    title.textContent = 'Title: ' + book.title;
    const author = document.createElement('p');
    author.textContent = 'Author: ' + book.author;
    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + book.pages;
    const read = document.createElement('p');
    read.textContent = 'Read: ' + (book.read ? 'Yes' : 'No');

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);

    booksContainer.appendChild(bookDiv);
}
