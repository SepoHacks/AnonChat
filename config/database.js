const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const connectToDatabase = async () => {
  try {
    await pool.getConnection();
    console.log("Connected to database successfuly");
    createTables();
  } catch (error) {
    console.log("Database Connection Faild!");
    console.log("Database Error : ", error);
    return;
  }
};

const createTables = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message TEXT NOT NULL,
        username VARCHAR(255) NOT NULL
      )`
    );

    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        ip VARCHAR(255) NOT NULL
      )`
    );
    console.log("Tables created successfuly");
  } catch (error) {
    console.log("Table creation faild!");
    console.log("Table creation error : ", error);
  }
};

module.exports = {
  pool,
  connectToDatabase,
};
