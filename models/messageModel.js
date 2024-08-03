const database = require("../config/database.js");

const getAllMessages = async () => {
  const [rows] = await database.pool.query("SELECT * FROM messages");
  return rows || null;
};

const postMessage = async (message, username) => {
  await database.pool.query("INSERT INTO messages SET ?", [message]);
};

module.exports = {
  getAllMessages,
  postMessage,
};
