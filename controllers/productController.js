const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (price <= 0 || stock < 0) {
      return res.status(400).json({ error: 'Price must be positive and stock non-negative' });
    }
    
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const id = req.params.id;
    
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (price <= 0 || stock < 0) {
      return res.status(400).json({ error: 'Price must be positive and stock non-negative' });
    }
    
    const updated = await Product.update(id, { name, price, stock });
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
