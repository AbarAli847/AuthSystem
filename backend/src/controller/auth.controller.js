const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const User = require('../model/user');

// ===== JWT TOKEN GENERATOR =====
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ===== REGISTER =====
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== LOGIN =====
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    // Find user
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(foundUser._id);

    res.json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===== GET ME =====
const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("GETME ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe };