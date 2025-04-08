const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Import the User model from your models initializer (using init.js)
const { User } = require('../models/init');

const saltRounds = 10; // Adjust as needed for password hashing

// GET /
// Render the main landing page (login and sign-up forms)
router.get('/', (req, res) => {
  res.render('index'); // Assumes views/index.ejs exists
});

// POST /signup
// Create a new user account
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).send("Please provide username, email, and password.");
    }
    
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send("A user with that email already exists.");
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    // In a production app, you might automatically log the user in here
    res.status(201).send("User created successfully.");
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).send("Error creating user.");
  }
});

// POST /login
// Authenticate an existing user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic input validation
    if (!email || !password) {
      return res.status(400).send("Please provide email and password.");
    }
    
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }
    
    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid email or password.");
    }
    
    // At this point, authentication is successful.
    // You can now create a session or generate a token for the user.
    // For now, we'll simply send a success message.
    res.send("Login successful.");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login.");
  }
});

module.exports = router;
