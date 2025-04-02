const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Middleware to parse JSON request body
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Dummy user database
const users = [
    { username: 'user1', password: 'password123' },
    { username: 'user2', password: 'password456' }
];

// Middleware for authentication
app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.user) {
        next(); // User is authenticated, proceed to next middleware/route
    } else {
        res.status(401).json({ message: "Unauthorized access. Please log in." });
    }
});

// Route for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.user = username; // Store username in session
        res.json({ message: "Login successful!", user: username });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// Route for user logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

// Protected route example
app.get('/customer/auth/profile', (req, res) => {
    res.json({ message: `Welcome, ${req.session.user}! This is your profile.` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
