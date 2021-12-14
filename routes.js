const url = require("url");
const ejs = require("ejs");
// const http = require("http");
const util = require("util");
const formidable = require("formidable");

const con = require("./connection")

const requestHandler = (req, res) =>{
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;
    path = path.replace(/^\/+|\/+$/g, "");

    // console.log("this is the path you're searching for ", path);
    // console.log(req.headers);

    if (path == "" ) {

        // con.connect(function(err) {
        //     if (err) throw err;
        //     console.log("Connected!");
        //     var sql = "INSERT INTO `flights`(arrivalStation,departureStation) VALUES ('CASA' ,'SAFI');"
            
        //     con.query(sql, function (err, result) {
        //       if (err) throw err;
        //       console.log("1 record inserted");
        //     });
        //   });

        ejs.renderFile("./views/home.ejs", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            if (err) {
                console.log(err);
                res.end();
            } else {

                res.end(data);
            }
        });

    }else if(path == "horaires" && req.method.toLowerCase() == "post") {

        console.log("inside horaires")
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {

            console.log(req);
            if(err){
                //handle errors
                console.error(err);
                return;
            }
            var obj;
            util.inspect(obj = {fields: fields, files: files})
            console.log("this is the object :", obj.fields.DepartDate);
            res.writeHead(200, { "Content-Type": "text/plain"});
            res.write("the response\n\n");
            res.end(util.inspect({fields : fields, files : files}));

            let today = new Date();

            let hours = String(today.getHours()).padStart(2, "0");
            let minutes = String(today.getMinutes()).padStart(2, "0");
            let seconds = String(today.getSeconds()).padStart(2, "0");

            let DATETIME = obj.fields.DepartDate + ' ' + hours + ':' + minutes + ':' + seconds
            console.log(DATETIME);

            con.connect(function(err) {
                if (err) console.error(err);

                var sql = "SELECT * FROM dates WHERE departDate <='"+DATETIME+"'";

                con.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log("resultttt",result);
                });

              });

        })


    }else if (path == "profile"){

        ejs.renderFile("./views/profile.ejs", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
        });
    } else {
        // show an error page 404
        ejs.renderFile("./views/404.ejs", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
        });
    }
    
    
}

module.exports = requestHandler;

// console.log(http.METHODS); // SHOW ALL METHODS OF HTTP
// console.log(http.STATUS_CODES); // FIND ALL STATUS CODES OF HTTP
// console.log(req.headers); // FIND OUT WHAT THE BROWSER SENDING TO US

// path.pathname path.search path.query -  path, querystring, qs object
// path.port path.protocol path.origin - all nuls



// case "/":
//     res.statusCode = 301;
// res.setHeader("Location", "/about");
// res.end();
// break;




//   switch (path) {

//         case "":
//             ejs.renderFile("./views/home.ejs", function (err, data) {
//                 res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             if (err) {
//                 console.log(err);
//                 res.end();
//             } else {

//                 res.end(data);
//             }
//             });
//         break;

//         case "footer":
//             ejs.renderFile("./views/footer.ejs", function (err, data) {
//                 res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             if (err) {
//                 console.log(err);
//                 res.end();
//             } else {

//                 res.end(data);
//             }
//             });
//         break;
            
//         case "profile":
//             ejs.renderFile("./views/profile.ejs", function (err, data) {
//                 res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             if (err) {
//                 console.log(err);
//                 res.end();
//             } else {
//                 res.end(data);
//             }
//             });
//         break;

        
//         default :
//             ejs.renderFile("./views/404.ejs", function (err, data) {
//                 res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             if (err) {
//                 console.log(err);
//                 res.end();
//             } else {
//                 res.end(data);
//             }
//             });
//             break;
//         }