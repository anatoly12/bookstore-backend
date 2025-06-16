const axios = require("axios");

const BASE_URL = "http://localhost:5000";

const username = "jane";
const password = "1234";

// Task 6: Register
async function registerUser() {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      password,
    });
    console.log("✅ Registered:", response.data);
  } catch (err) {
    console.error("❌ Register Error:", err.response?.data || err.message);
  }
}

// Task 7: Login
async function loginUser() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    console.log("✅ Login:", response.data);
  } catch (err) {
    console.error("❌ Login Error:", err.response?.data || err.message);
  }
}

// Task 5: Get Reviews
async function getBookReviews(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/books/review/${isbn}`);
    console.log("📚 Reviews:", response.data);
  } catch (err) {
    console.error("❌ Reviews Error:", err.response?.data || err.message);
  }
}

// Task 8: Add/Modify Review
async function modifyReview(isbn, review) {
  try {
    const response = await axios.put(
      `${BASE_URL}/review/${isbn}`,
      {
        review,
      },
      {
        headers: { username },
      }
    );
    console.log("📝 Review Updated:", response.data);
  } catch (err) {
    console.error("❌ Review Update Error:", err.response?.data || err.message);
  }
}

// Task 9: Delete Review
async function deleteReview(isbn) {
  try {
    const response = await axios.delete(`${BASE_URL}/review/${isbn}`, {
      headers: { username },
    });
    console.log("🗑️ Review Deleted:", response.data);
  } catch (err) {
    console.error("❌ Delete Error:", err.response?.data || err.message);
  }
}

// Task 10: Get all books using async/await
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", response.data);
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
}

// Task 11: Search by ISBN using Promises
function searchByISBN(isbn) {
  axios
    .get(`${BASE_URL}/books/isbn/${isbn}`)
    .then((response) => {
      console.log("Book by ISBN:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching book by ISBN:", error.message);
    });
}

// Task 12: Search by Author (using async/await)
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log("Books by Author:", response.data);
  } catch (error) {
    console.error("Error fetching by author:", error.message);
  }
}

// Task 13: Search by Title (using async/await)
async function searchByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    console.log("Books by Title:", response.data);
  } catch (error) {
    console.error("Error fetching by title:", error.message);
  }
}

// 🔁 Call the functions to test
// loginUser();
getAllBooks(); // Task 10
searchByISBN("9781"); // Task 11
searchByAuthor("John Smith"); // Task 12
searchByTitle("Learn Node.js"); // Task 13
// modifyReview("9781", "Fantastic book for plant lovers!");
// getBookReviews("9781");
// registerUser();
// deleteReview("9781");
(async () => {
  await registerUser();
  // await loginUser();
  // await modifyReview("9781", "Fantastic book for plant lovers!");
  // await getBookReviews("9781");
  // await deleteReview("9781");
})();
