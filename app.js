const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// QUAN TRỌNG: Thứ tự middleware ĐÚNG
app.use(express.urlencoded({ extended: true })); // 1. Xử lý form data
app.use(express.json()); // 2. Xử lý JSON
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
})); // 3. Method override - QUAN TRỌNG PHẢI ĐỨNG TRƯỚC
// Thêm vào app.js sau methodOverride
app.use((req, res, next) => {
  console.log('=== REQUEST DEBUG ===');
  console.log('Method:', req.method);
  console.log('Original URL:', req.originalUrl);
  console.log('Body:', req.body);
  console.log('=====================');
  next();
});
// 4. Các middleware khác
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.currentPage = req.path === '/' ? 'home' : 
                           req.path.startsWith('/products') ? 'products' :
                           req.path.startsWith('/suppliers') ? 'suppliers' : '';
    res.locals.productCount = 0;
    res.locals.supplierCount = 0;
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});