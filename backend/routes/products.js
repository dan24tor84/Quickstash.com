const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Simple storage (replaces with Cloudinary/S3 later)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Mock in-memory product list
let products = [];

// POST: Upload new product with image
router.post('/upload', upload.single('image'), (req, res) => {
  const { name, price, description, vendorId } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  const product = {
    id: products.length + 1,
    name,
    price,
    description,
    imageUrl,
    vendorId: parseInt(vendorId)
  };
  products.push(product);
  res.status(201).json({ message: 'Product added', product });
});

// GET: List all products (or filter by vendor)
router.get('/list', (req, res) => {
  const { vendorId } = req.query;
  const filtered = vendorId ? products.filter(p => p.vendorId == vendorId) : products;
  res.json(filtered);
});

module.exports = router;
