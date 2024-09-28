const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const readData = (fileName) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'));
};

const writeData = (fileName, data) => {
  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(data, null, 2));
};

// Get all products
app.get('/api/products', (req, res) => {
  const products = readData('products.json');
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readData('products.json');
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// Get cart items
app.get('/api/cart', (req, res) => {
  const cart = readData('cart.json');
  res.json(cart);
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { id } = req.body;
  const products = readData('products.json');
  const cart = readData('cart.json');
  const product = products.find(p => p.id === id);

  if (product && !product.incart) {
    product.incart = true;
    cart.push({ ...product, quantity: 1 });  // Set initial quantity to 1
    writeData('cart.json', cart);
    writeData('products.json', products);  // Update inCart flag
    res.json(cart);
  } else {
    res.status(400).json({ message: 'Product already in cart or not found' });
  }
});



// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  let cart = readData('cart.json');
  let products = readData('products.json');

  // Remove product from cart
  cart = cart.filter(item => item.id !== productId);
  writeData('cart.json', cart);

  // Update product inCart flag
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex].incart = false;
    writeData('products.json', products);
  }

  res.json(cart);
});




// Update product quantity
app.put('/api/cart/quantity', (req, res) => {
  const { id, quantity } = req.body;
  let cart = readData('cart.json');
  const productIndex = cart.findIndex(item => item.id === id);

  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
    writeData('cart.json', cart);
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Product not found in cart' });
  }
});

// Get total price of cart
app.get('/api/cart/total', (req, res) => {
  const cart = readData('cart.json');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ total });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
