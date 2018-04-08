var http = require("http");
const healthService = require('./service/HealthCheckService')

http.createServer(function (req, res) {
    healthService.startHealthCheck()
    healthService.healthMessage();
}).listen(8000);