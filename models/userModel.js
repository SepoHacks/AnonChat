const database = require("../config/database.js");

const getUserByIp = async (ip) => {
  const [rows] = await database.pool.query("SELECT username FROM users WHERE ip = ?", [ip]);
  return rows[0] || null;
};

const createUser = async (username, ip) => {
  const randomUsername = Math.random().toString(36).substring(7);

  if (database.pool.query("SELECT * FROM users WHERE username = ?", [randomUsername])) {
    return createUser(username, ip);
  }

  await database.pool.query("INSERT INTO users SET ?", [{ username, ip }]);
}