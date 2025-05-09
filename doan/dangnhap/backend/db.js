const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Tên user MySQL của bạn
  password: '',       // Mật khẩu MySQL (để trống nếu không có)
  database: 'login_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;