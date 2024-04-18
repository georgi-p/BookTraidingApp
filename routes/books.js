const express = require('express');
const router = express.Router();
const BookModel = require('../models/book');

// Display all books
router.get('/', async (req, res) => {
  try {
    const books = await BookModel.getAllBooks();
    res.render('books', { books });
  } catch (error) {
    res.status(500).send('Error retrieving books from the database');
  }
});

// Display form to add a new book
router.get('/add', (req, res) => {
  res.render('add_book');
});

// Post request to add a new book
router.post('/add', async (req, res) => {
  const { title, author } = req.body;
  const ownerId = req.session.userId; // Assumes you have user session management
  try {
    await BookModel.addBook(title, author, ownerId);
    res.redirect('/books');
  } catch (error) {
    res.status(500).send('Error adding book to the database');
  }
});

// Display form to update a book
router.get('/edit/:id', async (req, res) => {
  try {
    const book = await BookModel.getBookById(req.params.id);
    res.render('edit_book', { book });
  } catch (error) {
    res.status(500).send('Error finding book');
  }
});

// Post request to update a book
router.post('/edit/:id', async (req, res) => {
  const { title, author } = req.body;
  try {
    await BookModel.updateBook(req.params.id, title, author);
    res.redirect('/books');
  } catch (error) {
    res.status(500).send('Error updating book in the database');
  }
});

// Route to delete a book
router.get('/delete/:id', async (req, res) => {
  try {
    await BookModel.deleteBook(req.params.id);
    res.redirect('/books');
  } catch (error) {
    res.status(500).send('Error deleting book');
  }
});

module.exports = router;