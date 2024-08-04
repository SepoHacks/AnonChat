const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  message: "Too many requests, rest bro :D",
});

const messageLimiter = rateLimit({
  windowMs: 3000,
  max: 1,
  message: "Too many messages sent, please try again later.",
});

const fetchLimit = rateLimit({
  windowMs: 1000,
  max: 3,
  message: "Too many requests, wait a sec."
});

module.exports = { messageLimiter, limiter, fetchLimit };