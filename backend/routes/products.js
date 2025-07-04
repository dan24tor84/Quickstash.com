const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'quickstash_products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Mock product list
let products = [];

// POST: Upload product with image
router.post('/upload', upload.single('image'), (req, res) => {
  const { name, price, vendorId } = req.body;
  const imageUrl = req.file.path;
  const product = {
    id: products.length + 1,
    name,
    price,
    vendorId,
    image: imageUrl,
  };
  products.push(product);
  res.status(201).json({ message: 'Product uploaded', product });
});

// GET: List all products
router.get('/list', (req, res) => {
  res.json(products);
});

module.exports = router;
