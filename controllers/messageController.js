const { prometheus } = require("../config/prometheus.js");
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
    prometheus.messageCounter.inc({ status : "blank"})
    return res.json({ msg: "Message is required." });
  }

  try {
    await messageModel.postMessage(message, req.ip);
    prometheus.messageCounter.inc({ status : "success"})
    return res.json({ msg: "Sent!" });
  } catch (error) {
    console.log(error);
    prometheus.messageCounter.inc({ status : "failed"})
    return res.json({ msg: "Failed!" });
  }
};

module.exports = { fetchMessages, createMessage };
