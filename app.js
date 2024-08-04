require("dotenv").config();

const express = require("express");
const path = require("path");

const database = require("./config/database.js");
const prometheus = require("./config/prometheus.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Mideleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./config/rateLimit.js").limiter);

app.use((req, res, next) => {
  prometheus.httpReqCounter.inc({
    method: req.method,
    route: req.path,
  });

  next();
});

// Routes
app.use("/", require("./routes/messageRoutes.js"));

const PORT = process.env.PORT || 3000;

database.connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App started at ${PORT}`);
  });
});

