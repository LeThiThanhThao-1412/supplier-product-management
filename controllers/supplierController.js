const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

exports.getSupplierForm = (req, res) => {
  res.render('suppliers/form', { 
    title: req.params.id ? 'Chỉnh sửa nhà cung cấp - SupplierPro' : 'Thêm nhà cung cấp - SupplierPro',
    supplier: null // Thêm giá trị mặc định
  });
};

exports.createSupplier = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
  } catch (error) {
    res.render('suppliers/form', { error: error.message });
  }
};

exports.editSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { 
      title: 'Chỉnh sửa nhà cung cấp - SupplierPro',
      supplier 
    });
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.redirect('/suppliers');
  }
};

exports.updateSupplier = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/suppliers');
};

exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};