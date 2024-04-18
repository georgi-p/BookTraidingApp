const db = require('./db');
const crypto = require('crypto');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const verifyPassword = (inputPassword, storedPassword) => {
  return hashPassword(inputPassword) === storedPassword;
};

const UserModel = {
  findUser: (username) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  createUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const hashedPassword = hashPassword(password);  // Use local function directly
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  },

  hashPassword,  // Assign local function to the object property if needed elsewhere
  verifyPassword
};

module.exports = UserModel;