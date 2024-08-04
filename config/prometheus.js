const prometheus = require("prom-client");

prometheus.collectDefaultMetrics({ timeout: 15000 });

const httpReqCounter = new prometheus.Counter({
  name: "sepochat_http_req_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route"],
});

module.exports = {
  prometheus,
  httpReqCounter,
};
