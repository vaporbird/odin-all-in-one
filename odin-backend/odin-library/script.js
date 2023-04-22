const addBookOuther = document.getElementById('add-book');
addBookOuther.addEventListener('click', () => addBookForm.classList.toggle('collapsed'));
const addBookForm = document.getElementById('book-submit-form');
const library = document.getElementById('book-section');
const addBookButton = document.getElementById('add-new-book');
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(!document.getElementById('title').checkValidity()){
        document.getElementById('title').focus();
        return;
    }
    if(!document.getElementById('author').checkValidity()){
        document.getElementById('author').focus();
        return;
    }
    if(!document.getElementById('pages').checkValidity()){
        document.getElementById('pages').focus();
        return;
    }
    if(!document.getElementById('read').checkValidity()){
        document.getElementById('read').focus();
        return;
    }
    
    const book = CreateNewBookFromForm();
    book.AddBookToLibrary();
    DisplayLibrary ();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
});

const books = [];
/* const book1 = new Book('first', 'book', 321, true);
console.log(book1);
AddBookToLibrary(book1);
const book2 = new Book('first', 'book', 321, true);
console.log(book2);
AddBookToLibrary(book2);
 */
function CreateNewBookFromForm(){
    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    return new Book(title, author, pages, read);
}

function Book (title, author, pages, read){
    this.author = author.trim();
    this.title = title.trim();
    this.pages = +pages;
}

Book.prototype.AddBookToLibrary = function() {
    books.push(this);
    localStorage.setItem("books", JSON.stringify(books));
    DisplayLibrary();
}

Book.prototype.PrintMe = () => {
    console.log('printed');
}

/* function AddBookToLibrary (book) {
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    DisplayLibrary();
} */

function LoadLibrary () {
    library.textContent = ''
    const booksInner = JSON.parse(localStorage.getItem("books"));
    console.table(booksInner);
    books.length = 0;
    for (book of booksInner) {
        books.push(book);
    }
}

DisplayLibrary ();
function DisplayLibrary () {
    LoadLibrary();
    for (book of books){
        const element = document.createElement("div");

        const text = document.createElement("span");
        text.innerText = `${book.title} by ${book.author}, ${book.pages} pages `

        const read = document.createElement("checkbox");
        read.checked = book.read;
        
        const remove = document.createElement("button");
        remove.addEventListener('click', (e) => RemoveBook(e));
        remove.innerText = 'X';

        element.appendChild(text);
        element.appendChild(read);
        element.appendChild(remove);

        library.appendChild(element);
    }
}

function RemoveBook(e) {
    const child = e.srcElement.parentNode;
    const parent = e.srcElement.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    LoadLibrary();
    DisplayLibrary ();
    console.table(books);
}