const express = require('express');
const app = express();
app.use(express.json());

const books = require('./books');
const users = {}; // { username: { password, reviews: { isbn: review } } }

// TASK 10 – Get the book list using a callback wrapped in a Promise
app.get('/callback/books', function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    // simulate async behavior if needed (optional)
    resolve(Object.values(books));
  });

  get_books.then((data) => {
    console.log("📘 Task 10 resolved with book list");
    res.json(data);
  }).catch((err) => {
    res.status(500).json({ message: "Error fetching books" });
  });
});

// TASK 11 – Search by ISBN using Promises
app.get('/promise/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  })});

// TASK 12 – Search by Author using async/await
app.get('/async/author/:author', async (req, res) => {
  try {
    const author = req.params.author;

    const findBooksByAuthor = () => {
      return new Promise((resolve) => {
        const result = Object.values(books).filter(book => book.author === author);
        resolve(result);
      });
    };

    const booksByAuthor = await findBooksByAuthor();
    res.json(booksByAuthor);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books by author' });
  }
});
// TASK 13 – Search by Title using async/await
app.get('/async/title/:title', async (req, res) => {
  try {
    const title = req.params.title;

    const findBooksByTitle = () => {
      return new Promise((resolve) => {
        const result = Object.values(books).filter(book => book.title === title);
        resolve(result);
      });
    };

    const booksByTitle = await findBooksByTitle();
    res.json(booksByTitle);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books by title' });
  }
});

// Task 5
app.get('/books/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) return res.json(book.reviews || {});
  res.status(404).json({ error: 'Book not found' });
});


// Task 6
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).json({ error: 'User already exists' });
  users[username] = { password, reviews: {} };
  res.json({ message: 'Registered successfully' });
});


// Task 7
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) return res.json({ message: 'Login successful' });
  res.status(401).json({ error: 'Invalid credentials' });
});


// Auth middleware
function auth(req, res, next) {
  const { username } = req.headers;
  if (!username || !users[username]) return res.status(403).json({ error: 'Not authenticated' });
  req.user = users[username];
  req.username = username;
  next();
}

// Task 8
app.put('/review/:isbn', auth, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  if (!books[isbn]) return res.status(404).json({ error: 'Book not found' });

  req.user.reviews[isbn] = review;
  books[isbn].reviews[req.username] = review;

  res.json({ message: 'Review added/updated' });
});

// Task 9
app.delete('/review/:isbn', auth, (req, res) => {
  const { isbn } = req.params;
  if (!books[isbn]) return res.status(404).json({ error: 'Book not found' });

  delete req.user.reviews[isbn];
  delete books[isbn].reviews[req.username];

  res.json({ message: 'Review deleted' });
});

// Start server
app.listen(5000, () => {
  console.log('📚 Bookstore server running on http://localhost:5000');
});
