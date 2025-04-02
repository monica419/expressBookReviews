const express = require('express');
const books = require('../booksdb.js'); // Import book database
const axios = require('axios');
const public_users = express.Router();

// Task 1: Get the list of all books
public_users.get('/books', function (req, res) {
    return res.status(200).json({ books: JSON.stringify(books, null, 2) });
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let bookFound = null;

    for (let key in books) {
        if (books[key].isbn === isbn) {
            bookFound = books[key];
            break;
        }
    }

    if (bookFound) {
        return res.status(200).json(bookFound);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on Author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let filteredBooks = [];

    for (let key in books) {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            filteredBooks.push(books[key]);
        }
    }

    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 4: Get book details based on Title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let filteredBooks = [];

    for (let key in books) {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            filteredBooks.push(books[key]);
        }
    }

    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 5: Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    let bookFound = null;

    for (let key in books) {
        if (books[key].isbn === isbn) {
            bookFound = books[key];
            break;
        }
    }

    if (bookFound && bookFound.reviews) {
        return res.status(200).json(bookFound.reviews);
    } else {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
});

// Task 10: Get all books using Promises
public_users.get('/async/books', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// Task 11: Get book details by ISBN using Promises
public_users.get('/async/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book details" });
    }
});

// Task 12: Get book details by Author using Promises
public_users.get('/async/author/:author', async (req, res) => {
    try {
        const author = req.params.author;
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by author" });
    }
});

// Task 13: Get book details by Title using Promises
public_users.get('/async/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books by title" });
    }
});

module.exports.general = public_users;
