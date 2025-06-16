const express = require('express');
const app = express();
app.use(express.json());

const books = require('./books');
const users = {}; // { username: { password, reviews: { isbn: review } } }

// Task 1
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (book) return res.json(book);
  res.status(404).json({ error: 'Book not found' });
});

// Task 3
app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(b => b.author === req.params.author);
  res.json(result);
});

// Task 4
app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(b => b.title === req.params.title);
  res.json(result);
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
