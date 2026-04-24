// 数据库连接配置
const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 请根据实际情况修改
  password: 'root', // 请根据实际情况修改
  database: 'hubu_animal_rescue',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功');
    connection.release();
  }
});

// 导出连接池
module.exports = pool;
