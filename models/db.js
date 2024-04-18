const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./books.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error when connecting to the database', err.message);
  } else {
    console.log('Connected to the books.db database.');
  }
});

module.exports = db;