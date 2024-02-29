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

Book.prototype.readStatus = false;

/* testing data  --------------------------*/ 
let book = new Book('Dune', 'Frank Herbert', 896, true);
let book2 = new Book('Dune 2 ', 'Frank Herbert', 1896, true);
let book3 = new Book('Dune 3', 'Frank Herbert', 2896, true);
book.readStatus = true;
book2.readStatus = true;
book3.readStatus = true;
myLibrary[0] = book;
myLibrary[1] = book2;
myLibrary[2] = book3;
/*   --------------------------     */ 

const booksContainer = document.querySelector(".books");
function displayBooks(){
    for(let book of myLibrary){
        let index = myLibrary.indexOf(book);
        createBook(book, index);
    }
}

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
    if(document.querySelector('#title').value){
    let newBook = new Book(document.querySelector('#title').value, document.querySelector('#author').value,
    document.querySelector('#pages').value, document.querySelector('#read').checked);
    newBook.readStatus = document.querySelector('#read').checked;
    myLibrary.push(newBook);
    form.reset();
    addBookToDisplay(newBook);
    }
})

function addBookToDisplay(book){
    createBook(book);
}


function createBook(book, index = myLibrary.length - 1){
    const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class', `book`);
        bookDiv.setAttribute('data-index', index);
        bookDiv.setAttribute('id', `_${index}`);
        const title = document.createElement('p');
        title.textContent = 'TITLE: ' + book.title;
        const author = document.createElement('p');
        author.textContent = 'AUTHOR: ' + book.author;
        const pages = document.createElement('p');
        pages.textContent = 'PAGES: ' + book.pages;
        const read = document.createElement('p');
        read.setAttribute('id', `_${index}-read`)
        read.textContent = 'READ: ' + (book.read ? 'Yes' : 'No');
        const changeReadStatus = document.createElement('button');
        changeReadStatus.setAttribute('class', 'change');
        changeReadStatus.setAttribute('data-index', index);
        changeReadStatus.textContent = 'Change';


        changeReadStatus.addEventListener('click', (e)=> {
            changeStatus(e.target.dataset.index);
        })

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('class', `remove`);
        removeButton.setAttribute('data-index', index);
        removeButton.setAttribute('id', `_${index}`);

        removeButton.addEventListener('click', (e)=> {
            const clickedButton = e.target;
            myLibrary.splice(+clickedButton.dataset.index, 1);
            document.querySelector(`#_${+clickedButton.dataset.index}`).remove();
           
        })

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(read);
        bookDiv.appendChild(changeReadStatus);
        bookDiv.appendChild(removeButton);

        booksContainer.appendChild(bookDiv);
}


function changeStatus(bookIndex){

    
    if(myLibrary[bookIndex].readStatus) {
        myLibrary[bookIndex].readStatus = false;
    } else {
        myLibrary[bookIndex].readStatus = true;
    }

    document.querySelector(`#_${bookIndex}-read`).textContent =  'READ: ' + (myLibrary[bookIndex].readStatus ? 'Yes' : 'No');
}

displayBooks();
