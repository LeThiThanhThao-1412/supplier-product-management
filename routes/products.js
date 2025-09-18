const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/auth');

router.use(isLoggedIn);

router.get('/', productController.getAllProducts);
router.get('/new', productController.getProductForm);
router.post('/', productController.createProduct);
router.get('/:id/edit', productController.editProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct); // Giữ nguyên

module.exports = router;