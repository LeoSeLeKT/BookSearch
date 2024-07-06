document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const sortOptions = document.getElementById('sort-options');
    const bookList = document.getElementById('book-list');
    let books = [
        { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
        { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian" },
        { id: 3, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
        { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
        { id: 5, title: "Moby-Dick", author: "Herman Melville", genre: "Adventure" },
        { id: 6, title: "War and Peace", author: "Leo Tolstoy", genre: "Historical" },
        { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction" },
        { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
        { id: 9, title: "Ulysses", author: "James Joyce", genre: "Modernist" },
        { id: 10, title: "The Odyssey", author: "Homer", genre: "Epic" }
    ];
    const displayBooks = (filteredBooks = books) => {
        bookList.innerHTML = '';

        if (filteredBooks.length === 0) {
            bookList.innerHTML = '<p class="no-results">No results found</p>';
            return;
        }
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';

            const bookContent = `
                <h2 class="book-item__title">${highlightMatch(book.title)}</h2>
                <p class="book-item__author">${highlightMatch(book.author)}</p>
                <p class="book-item__genre">${highlightMatch(book.genre)}</p>
            `;

            bookItem.innerHTML = bookContent;
            bookList.appendChild(bookItem);
        });
    };
    const highlightMatch = (text) => {
        const query = searchBar.value.toLowerCase();
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="font-weight: bold; color: red;">$1</span>');
    };
    const searchBooks = () => {
        const query = searchBar.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    };
    const sortBooks = () => {
        const sortBy = sortOptions.value;
        books.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        displayBooks();
    };

    searchButton.addEventListener('click', searchBooks);
    sortOptions.addEventListener('change', sortBooks);
    //for enter
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === 'done' || event.key=='return') {
            searchBooks();
        }
    });
    sortBooks();
});
