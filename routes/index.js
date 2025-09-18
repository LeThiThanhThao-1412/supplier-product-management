const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  try {
    const { supplier, search } = req.query;
    let query = {};
    
    if (supplier) query.supplier = supplier;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    const products = await Product.find(query).populate('supplier');
    const suppliers = await Supplier.find();
    
    res.render('index', { 
      title: 'Trang Chủ - SupplierPro',
      products, 
      suppliers, 
      query: req.query // Đảm bảo có biến query
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', { 
      title: 'Trang Chủ - SupplierPro',
      products: [], 
      suppliers: [], 
      query: {} 
    });
  }
});

module.exports = router;