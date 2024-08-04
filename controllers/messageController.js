const messageModel = require("../models/messageModel");

const fetchMessages = async (req, res) => {
  try {
    return res.json(await messageModel.getAllMessages());
  } catch (error) {
    res.json({ msg: "Error when fetching messages." });
  }
};

const createMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({ msg: "Message is required." });
  }

  try {
    await messageModel.postMessage(message, req.ip);
    return res.json({ msg: "Sent!" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Failed!" });
  }
};

module.exports = { fetchMessages, createMessage };
