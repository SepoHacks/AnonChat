const messageModel = require("../models/messageModel");

const fetchMessages = async (req, res) => {
  try {
    return res.json(await messageModel.getAllMessages());
  } catch (error) {
    res.json({ msg: "Error when fetching messages." });
  }
};

const createMessage = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({ msg: "Message is required." });
  }

  messageModel.postMessage({ message, username: req.ip });
};

module.exports = { fetchMessages, createMessage };
