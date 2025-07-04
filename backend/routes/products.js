const express = require('express');
const router = express.Router();

let products = []; // In-memory store for now

// POST /api/products - Add a new product
router.post('/', (req, res) => {
  const { name, description, category, price, image } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    category,
    price,
    image
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product added', product: newProduct });
});

// GET /api/products - List all products
router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
