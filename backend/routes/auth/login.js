const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // Same as used in register.js

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  const user = users.find(u => u.email === email);
  if (!user)
    return res.status(401).json({ message: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '2h' });

  return res.status(200).json({ token });
});

module.exports = router;
