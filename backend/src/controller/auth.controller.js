const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const User = require('../model/user');

 
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;     
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'User already exists' });
    }   
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);     
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }     
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }    
    const token = generateToken(foundUser._id);
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};
//  Get me
const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Get me:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe };