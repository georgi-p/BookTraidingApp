const express = require('express');
const path = require('path');
const session = require('express-session');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key', // Use a real secret in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' } // Set to true if your site uses HTTPS
}));

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});