// Book Wish List
let bookWishList = [];  


/*/ Open/close dialog screen /*/

let addBookBtn = document.querySelector("#addBookBtn")
let addBookCard = document.querySelector(".addBookCard")
let closeModalBtn = document.querySelector("#closeModalBtn")

// Close modal
function closeModal() {
    if (document.querySelector("dialog").hasAttribute("open")) {
        document.querySelector("dialog").classList.remove("dialogFadeIn");
        document.querySelector("dialog").classList.add("dialogFadeOut");
        setTimeout(() => {
            document.querySelector("dialog").close();
        }, 300);
    };
}

// Open Modal Button
addBookBtn.addEventListener("click", () => {
    if (!document.querySelector("dialog").hasAttribute("open")) {
        document.querySelector("dialog").showModal();
        document.querySelector("dialog").classList.remove("dialogFadeOut");
        document.querySelector("dialog").classList.add("dialogFadeIn");
    };
    
});

// Open Modal Card
addBookCard.addEventListener("click", () => {
    if (!document.querySelector("dialog").hasAttribute("open")) {
        document.querySelector("dialog").showModal();
        document.querySelector("dialog").classList.remove("dialogFadeOut");
        document.querySelector("dialog").classList.add("dialogFadeIn");
    };
    
});

// Close modal Modal Button
closeModalBtn.addEventListener("click", () => {
    if (document.querySelector("dialog").hasAttribute("open")) {
        document.querySelector("dialog").classList.remove("dialogFadeIn");
        document.querySelector("dialog").classList.add("dialogFadeOut");
        setTimeout(() => {
            document.querySelector("dialog").close();
        }, 500)
        
    };
});


// Create Book Entry Constructor
function CreateBookEntry(title,author,pageNums) {
    this.title = title,
    this.author = author,
    this.pageNums = pageNums,
    this.readStatus = false
    this.id = crypto.randomUUID()
};


/* Add user book form entry values to Wish List Object and run updateDisplayFromForm()/ pass
user book form entry values to updateDisplayFromForm() */
function addBookToWishListObject() {
    
    let bookTitleValue = document.querySelector("#userBookTitle").value;
    let bookAuthorValue = document.querySelector("#userBookAuthor").value;
    let bookPagesValue = document.querySelector("#userBookPages").value;
    bookWishList.push(new CreateBookEntry(bookTitleValue,bookAuthorValue,bookPagesValue))
    updateDisplayFromForm(bookTitleValue,bookAuthorValue,bookPagesValue,bookWishList[bookWishList.length-1].id)
    

}

///


/* Update book wish list display cards by: Cloning the cardTemplate (HTML), 
insert the clone before the add book card, set each HTML tag to submitted user form values  */
function updateDisplayFromForm(bookTitle,bookAuthor,pageNums,bookId) {
    let cardTemplate = document.querySelector("#cardTemplate")
    let newBookCard = cardTemplate.cloneNode(true);
    // Add buttpon card
    let bookCardInsertCard = document.querySelector("#bookCardWrapperTemplate")
    
    // Remove id from cloned card
    newBookCard.removeAttribute('id');
    bookWishListWrapper.insertBefore(newBookCard,bookCardInsertCard);
    newBookCard.querySelector('#bookTitle').textContent = bookTitle;
    newBookCard.querySelector('#bookAuthor').textContent = bookAuthor;
    newBookCard.querySelector('#pageNums').textContent = `Page Numbers: ${pageNums}`;
    newBookCard.querySelector('.book-card-img-wrapper').style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    
    // Match HTML id to markup
    newBookCard.setAttribute("data-book-id",bookId)

    /* Add delete event listener to cloned card: On click, if the data id that was clicked matches created object book id, delete
    it from the array and update the display */
    newBookCard.querySelector('.deleteBtn').addEventListener('click', () => {
        for (let i = 0; i <= bookWishList.length-1; i++)  {
            if (bookWishList[i].id === bookId) {
                bookWishList.splice(i,1);
                updateDisplayAfterDelete(bookId);
            };
        };
    });

    /* Add read/unread event listener to cloned card: On click,  */
    newBookCard.querySelector('.readBtn').addEventListener('click', (e) => {
        // Get the read/unread button's .book wrapper parents' id
        let currentBookId = e.target.closest(".bookCardWrapper").getAttribute("data-book-id");
        /* If the book in bookWishList object matches the button's parent id, change the background color/text 
        of button and toggle the red/unread property object*/
        for (book of bookWishList) {
            if (book.id === currentBookId) { 
                if (book.readStatus) {
                    book.readStatus = false
                    e.target.style.backgroundColor = "#f7f7f7"
                    e.target.textContent = "Unread"
                } else {
                    book.readStatus = true
                    e.target.style.backgroundColor = "#d1ffb3"
                    e.target.textContent = "Read"
                };
            };
        };
    });
}; 

/* Update the display after delete button is clicked: Delete the HTML element that matches the book id 
that was clicked  */
function updateDisplayAfterDelete(currentBookId) {
    // All book cards 
    let bookCards = document.querySelectorAll('.bookCardWrapper')
    // Loop through all the cards, and if the current book id matches the HTML elements', remove the card
    bookCards.forEach((bookCard) => {
        if (bookCard.getAttribute("data-book-id") === currentBookId) {
            bookCard.remove();
        };
    });
};

/* When user submits a book entry: Prevent the defaul, add the form values to bookWishList  ,
match the dispay to object, restet the form, close the modal*/
let userForm = document.querySelector("form");
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToWishListObject();
    userForm.reset();
    closeModal();

});

