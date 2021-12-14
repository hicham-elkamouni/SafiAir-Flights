const http = require("http");
// const fs = require("fs");
const url = require("url");
const _ = require("lodash");

const routes = require("./routes/router");

const server = http.createServer(function (req, res){

    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;
    path = path.replace(/^\/+|\/+$/g, "");

    if (path == "") {
        path = "index";
    } else {
        path = path.split("/")[0]
    }

    let route = typeof routes[path] !== "undefined" ? routes[path] : routes["404"];
    console.log(route);

    let data = {
        path: path,
        url: parsedURL.pathname,
        req : req
    }
    
    route(data, res, req);
});

server.listen(3000);
