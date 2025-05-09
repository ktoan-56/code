const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const PORT = 3000;

// Cấu hình middleware
app.use(cors({
  origin: 'http://localhost:5500', // Cho phép truy cập từ Live Server
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(express.static('public'));

// API Đăng ký
app.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);

  try {
    const { name, email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    // Kết nối database
    const conn = await db.getConnection();
    
    // Kiểm tra email đã tồn tại chưa
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length > 0) {
      conn.release();
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const hash = await bcrypt.hash(password, 10);
    
    // Tạo user mới
    const [result] = await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash]
    );

    conn.release();
    
    // Trả về kết quả thành công
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      user: { id: result.insertId, name, email }
    });
    
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống, vui lòng thử lại sau'
    });
  }
});

// API Đăng nhập
app.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);

  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền email và mật khẩu'
      });
    }

    // Kết nối database
    const conn = await db.getConnection();
    
    // Tìm user theo email
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    // Kiểm tra user có tồn tại không
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email không tồn tại'
      });
    }

    const user = rows[0];
    
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác'
      });
    }

    // Trả về thông tin user (không trả về password)
    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      user: { id: user.id, name: user.name, email: user.email }
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống, vui lòng thử lại sau'
    });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên http://localhost:${PORT}`);
});