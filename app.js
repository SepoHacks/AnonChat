const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");

// const database = require("./config/database.js");
const prometheus = require("./config/prometheus.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Mideleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200,
    message: "Too many requests, rest bro :D",
  })
);

app.use((req, res, next) => {
  prometheus.httpReqCounter.inc({
    method: req.method,
    route: req.path,
  });

  next();
});

// Routes
app.use("/", require("./routes/messageRoutes.js"));

app.use("/metrics", (req, res) => {
  res.set("Content-Type", prometheus.prometheus.register.contentType);
  res.end(prometheus.prometheus.register.metrics());
});

const PORT = process.env.PORT || 3000;

// database.connectToDatabase().then(() => {
//   app.listen(PORT, () => {
//     console.log(`App started at ${PORT}`);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`App started at ${PORT}`);
// });
