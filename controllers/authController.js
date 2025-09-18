const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const newUser = new User({ username, password, email, phone });
    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.render('register', { error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    
    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    res.render('login', { error: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.render('forgot', { 
                error: 'Email không tồn tại trong hệ thống' 
            });
        }
        
        // Ở đây bạn có thể thêm logic gửi email reset mật khẩu
        // Tạm thời hiển thị thông báo thành công
        res.render('forgot', { 
            message: 'Yêu cầu reset mật khẩu đã được gửi. Vui lòng kiểm tra email.' 
        });
    } catch (error) {
        res.render('forgot', { error: error.message });
    }
};