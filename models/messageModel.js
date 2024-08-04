const database = require("../config/database.js");

const userModel = require("./userModel.js");

const getAllMessages = async () => {
  const [rows] = await database.pool.query("SELECT * FROM messages");
  return rows || null;
};

const postMessage = async (message, ip) => {
  const username = await userModel.getUserByIp(ip);
  await database.pool.query("INSERT INTO messages SET ?", { message: message, username: username });
};

module.exports = {
  getAllMessages,
  postMessage,
};
