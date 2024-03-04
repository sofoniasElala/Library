class Book {
    #title;
    #author;
    #pages;
    #read;
    constructor(title, author, pages, read){
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    info(){
        if(this.#read) readString = 'read in full';

        return (`${this.#title} by ${this.#author}, ${this.#pages} pages, ${readString}.`)
    }

    set readStatus(value){
        this.#read = value;
    }

    get readStatus(){
        return this.#read;
    }

    get title(){
        return this.#title;
    }
    get author(){
        return this.#author;
    }
    get pages(){
        return this.#pages;
    }
}

class TheLibrary {
    #library = [];

    displayLibrary(){
        /* testing data  --------------------------*/ 
        let book = new Book('Dune', 'Frank Herbert', 896, true);
        let book2 = new Book('Dune 2 ', 'Frank Herbert', 1896, true);
        let book3 = new Book('Dune 3', 'Frank Herbert', 2896, true);
        this.#library[0] = book;
        this.#library[1] = book2;
        this.#library[2] = book3;
        /*   --------------------------     */ 
        this.dialogController();
        for(let book of this.#library){
            let index = this.#library.indexOf(book);
            this.createBook(book, index);
        }
    }

    dialogController(){
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
            this.#library.push(newBook);
            form.reset();
            this.addBookToDisplay(newBook);
            }
        })
    }


    addBookToDisplay(book){
        this.createBook(book);
    }

    createBook(book, index = this.#library.length - 1){
        const bookDiv = document.createElement('div');
        const booksContainer = document.querySelector(".books");
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
            read.textContent = 'READ: ' + (book.readStatus ? 'Yes' : 'No');
            const changeReadStatus = document.createElement('button');
            changeReadStatus.setAttribute('class', 'change');
            changeReadStatus.setAttribute('data-index', index);
            changeReadStatus.textContent = 'Change';
    
    
            changeReadStatus.addEventListener('click', (e)=> {
                this.changeStatus(e.target.dataset.index);
            })
    
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.setAttribute('class', `remove`);
            removeButton.setAttribute('data-index', index);
            removeButton.setAttribute('id', `_${index}`);
    
            removeButton.addEventListener('click', (e)=> {
                const clickedButton = e.target;
                this.#library.splice(+clickedButton.dataset.index, 1);
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

     changeStatus(bookIndex){

    
        if(this.#library[bookIndex].readStatus) {
            this.#library[bookIndex].readStatus = false;
        } else {
            this.#library[bookIndex].readStatus = true;
        }
    
        document.querySelector(`#_${bookIndex}-read`).textContent =  'READ: ' + (this.#library[bookIndex].readStatus ? 'Yes' : 'No');
    }
}

const library = new TheLibrary();
library.displayLibrary();