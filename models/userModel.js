const database = require("../config/database.js");

const getUserByIp = async (ip) => {
  const [result] = await database.pool.query("SELECT username FROM users WHERE ip = ?", [ip]);
  
  if (!result[0]) {
    await createUser(ip);
    return getUserByIp(ip);
  }

  return result[0].username || null;
};

const createUser = async (ip) => {
  const randomUsername = Math.random().toString(36).substring(2);

  const [existingUser] = await database.pool.query("SELECT * FROM users WHERE username = ?", [randomUsername]);
  if (existingUser.length > 0) {
    return createUser(ip);
  }

  await database.pool.query("INSERT INTO users (username, ip) VALUES (?, ?)", [randomUsername, ip]);
};

module.exports = {
  getUserByIp,
  createUser,
};