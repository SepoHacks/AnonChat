const prometheus = require("prom-client");

const httpReqCounter = new prometheus.Counter({
  name: "anonchat_http_req_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route"],
});

module.exports = {
  prometheus,
  httpReqCounter,
};
