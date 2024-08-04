const express = require("express");
const router = express.Router();

const prometheus = require("../config/prometheus.js");

const messageController = require("../controllers/messageController");

router.post(
  "/send",
  require("../config/rateLimit.js").messageLimiter,
  messageController.createMessage
);

router.get("/messages", require("../config/rateLimit.js").fetchLimit ,messageController.fetchMessages);

router.get("/metrics", async (req, res) => {
  res.set("Content-Type", prometheus.prometheus.register.contentType);
  res.end(await prometheus.prometheus.register.metrics());
});

router.get("/", (req, res) => {
  res.sendFile("main.html", { root: "public" });
});

module.exports = router;
