const http = require("http");
// const fs = require("fs");
const _ = require("lodash");

const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3000);
