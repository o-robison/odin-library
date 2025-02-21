class Book {
    constructor(title, author, numPages, isRead) {
        this._title = title;
        this._author = author;
        this._numPages = numPages;
        this._isRead = isRead;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get numPages() {
        return this._numPages;
    }
    get isRead() {
        return this._isRead;
    }
    set isRead(value) {
        this._isRead = value;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}

class Library {
    constructor() {
        this._books = [];
    }
    get books() {
        return this._books;
    }
    get length() {
        return this._books.length;
    }

    addBook(title, author, numPages, isRead) {
        let newBook = new Book(title, author, numPages, isRead);
        this.books.push(newBook);
    }

    removeBook(bookID) {
        this.books.splice(bookID, 1);
    }
}

(function ScreenController() {
    const tbody = document.querySelector("tbody");
    const addBook = document.querySelector("#addBook");
    const dialog = document.querySelector("dialog");
    const dialogClose = document.querySelector("#closeDialog");
    const submitNewBook = document.querySelector("#submitBook");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#numPages");
    const readInput = document.querySelector("#isRead");

    const library = new Library();

    function displayLibrary() {
        tbody.innerHTML = "";
        for (var i=0; i<library.length; i++) {
            const book = library.books[i];
            const newRow = tbody.insertRow();
            for (const [key, prop] of Object.entries(book)) {
                const newCell = newRow.insertCell();
                const newText = document.createTextNode(prop);
                newCell.appendChild(newText);
            }
            if(!book.isRead){
                const readButtonCell = newRow.insertCell();
                readButtonCell.innerHTML = `<button class="markRead" data-bookid="${i}">Mark Read</button>`;
            } else {
                const blankCell = newRow.insertCell();
            }
            const removeButtonCell = newRow.insertCell();
            removeButtonCell.innerHTML = `<button class="removeBook" data-bookid="${i}">Remove</button>`;
        }
    
        const readButtons = document.getElementsByClassName("markRead");
        for (button of readButtons) {
            button.addEventListener("click", (e) => {
                const readBook = library.books[e.target.dataset.bookid];
                readBook.toggleRead();
                displayLibrary();
            });
        }
    
        const removeButtons = document.getElementsByClassName("removeBook");
        for (button of removeButtons) {
            button.addEventListener("click", (e) => {
                library.removeBook(e.target.dataset.bookid);
                displayLibrary();
            });
        }
    }

    addBook.addEventListener("click", () => {
        dialog.showModal();
    });
    
    dialogClose.addEventListener("click", () => {
        dialog.close();
    });
    
    submitNewBook.addEventListener("click", (e) => {
        library.addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        titleInput.value = authorInput.value = pagesInput.value = "";
        readInput.checked = false;
        e.preventDefault();
        dialog.close();
        displayLibrary();
    });

})();