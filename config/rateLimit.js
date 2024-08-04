const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: "Too many requests, rest bro :D",
});

const messageLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many messages sent, please try again later.",
});

module.exports = { messageLimiter, limiter };