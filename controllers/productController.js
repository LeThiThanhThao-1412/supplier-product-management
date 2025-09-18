const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.getAllProducts = async (req, res) => {
  const { supplier, search } = req.query;
  let query = {};
  
  if (supplier) query.supplier = supplier;
  if (search) query.name = { $regex: search, $options: 'i' };
  
  const products = await Product.find(query).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { 
    title: 'Quản lý sản phẩm - SupplierPro',
    products, 
    suppliers,
    query: req.query // Thêm biến query
  });
};
exports.getProductForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { 
    title: req.params.id ? 'Chỉnh sửa sản phẩm - SupplierPro' : 'Thêm sản phẩm - SupplierPro',
    suppliers,
    product: null // Thêm giá trị mặc định
  });
};

exports.createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    const suppliers = await Supplier.find();
    res.render('products/form', { error: error.message, suppliers });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/form', { 
      title: 'Chỉnh sửa sản phẩm - SupplierPro',
      product, 
      suppliers 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.redirect('/products');
  }
};

exports.updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};