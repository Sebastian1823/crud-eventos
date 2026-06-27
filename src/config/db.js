const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.MYSQLHOST,
  port:     process.env.MYSQLPORT     || 3306,
  user:     process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MySQL');
    conn.release();
  })
  .catch(err => console.error('❌ Error al conectar a MySQL:', err.message));

module.exports = pool;
