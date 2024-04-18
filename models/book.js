const db = require('./db');

const BookModel = {
  addBook: (title, author, ownerId) => {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO books (title, author, owner_id) VALUES (?, ?, ?)", [title, author, ownerId], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  },

  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM books", (err, books) => {
        if (err) reject(err);
        else resolve(books);
      });
    });
  },

  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM books WHERE id = ?", [id], (err, book) => {
        if (err) reject(err);
        else resolve(book);
      });
    });
  },

  updateBook: (id, title, author) => {
    return new Promise((resolve, reject) => {
      db.run("UPDATE books SET title = ?, author = ? WHERE id = ?", [title, author, id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },

  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM books WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

module.exports = BookModel;