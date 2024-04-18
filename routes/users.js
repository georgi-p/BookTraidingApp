const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');


// Route to serve the login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Route to process login form submissions
router.post('/login', async (req, res) => {
  console.log('Logging in User:', req.body.username);
  try {
    const { username, password } = req.body;
    console.log('Finding User');
    const user = await UserModel.findUser(username);
    console.log('User Found:', user);
    if (user && UserModel.verifyPassword(password, user.password)) {
      console.log('Password Verified');
      req.session.userId = user.id;
      res.redirect('/books');
    } else {
      console.log('Invalid Credentials');
      res.render('login', { title: 'Login', error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).send('Internal server error');
  }
});

// Route to serve the registration page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Route to process registration form submissions
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = UserModel.hashPassword(password);
    const user = await UserModel.createUser(username, hashedPassword);
    if (user) {
      req.session.userId = user.id; // assuming session setup is correct
      res.redirect('/');
    } else {
      res.render('register', { title: 'Register', error: 'Registration failed' });
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

router.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out');
      }

      // Redirect to home page or login page after logout
      res.redirect('/');
  });
});

module.exports = router;