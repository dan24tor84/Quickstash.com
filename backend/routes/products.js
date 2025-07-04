const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'QuickStash',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

let uploadedProducts = [];

router.post('/upload', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file.path;

  const product = { id: Date.now(), name, description, imageUrl };
  uploadedProducts.push(product);

  res.json({ message: 'Product uploaded successfully', product });
});

router.get('/', (req, res) => {
  res.json(uploadedProducts);
});

module.exports = router;
