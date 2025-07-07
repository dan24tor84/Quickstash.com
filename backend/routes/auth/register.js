const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // TEMPORARY: replace with DB in production

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  const existingUser = users.find(user => user.email === email);
  if (existingUser)
    return res.status(409).json({ message: 'User already exists.' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  return res.status(201).json({ message: 'User registered successfully.' });
});

module.exports = router;
