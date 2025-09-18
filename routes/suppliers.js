const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

router.use(isLoggedIn);

router.get('/', supplierController.getAllSuppliers);
router.get('/new', supplierController.getSupplierForm);
router.post('/', supplierController.createSupplier);
router.get('/:id/edit', supplierController.editSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier); // Giữ nguyên

module.exports = router;