const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const uri = 'mongodb+srv://fatima:lH4C9Q8nlq86ToTp@cluster0.mheaj.mongodb.net/Ecommerce?retryWrites=true&w=majority';
const client = new MongoClient(uri);




const readData = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) return []; 
  return JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
};

const writeData = (fileName, data) => {
  fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(data, null, 2));
};


const fetchProductsFromDB = async () => {
  try {
    await client.connect();
    const db = client.db('Ecommerce');
    const products = await db.collection('products').find().toArray();
    writeData('products.json', products);
    console.log('Products data written to products.json');
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
  } finally {
    await client.close();
  }
};

const fetchCartFromDB = async () => {
  try {
    await client.connect();
    const db = client.db('Ecommerce');
    const cart = await db.collection('cart').find().toArray();
    writeData('cart.json', cart);
    console.log('Cart data written to cart.json');
  } catch (error) {
    console.error('Error fetching cart from MongoDB:', error);
  } finally {
    await client.close();
  }
};


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
 
  writeData('products.json', []); 
  writeData('cart.json', []); 
  
  await fetchProductsFromDB();
  await fetchCartFromDB();
});


app.get('/api/products', (req, res) => {
  const products = readData('products.json');
  res.json(products);
});


app.get('/api/products/:id', (req, res) => {
  const products = readData('products.json');
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});


app.get('/api/cart', (req, res) => {
  const cart = readData('cart.json');
  res.json(cart);
});


app.post('/api/cart', (req, res) => {
  const { id } = req.body;
  const products = readData('products.json');
  const cart = readData('cart.json');
  const product = products.find(p => p.id === id);

  if (product && !product.incart) {
    product.incart = true;
    cart.push({ ...product, quantity: 1 }); 
    writeData('cart.json', cart);
    writeData('products.json', products); 
    res.json(cart);
  } else {
    res.status(400).json({ message: 'Product already in cart or not found' });
  }
});


app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  let cart = readData('cart.json');
  let products = readData('products.json');

 
  cart = cart.filter(item => item.id !== productId);
  writeData('cart.json', cart);

  
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
