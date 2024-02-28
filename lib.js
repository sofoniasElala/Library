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
