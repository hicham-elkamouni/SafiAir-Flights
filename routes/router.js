const ejs = require("ejs");
const fs = require("fs");
const util = require("util");
const formidable = require("formidable");
const path = require("path");

const con = require("../database/connection");

router = {
  horaires: function (data, res, req) {

    let d = "HEEEEEEEY";
    console.log(req.method);
    // get the inserted data from front 
    if (req.method === "POST") {
      console.log("INSIDE POST METHOD")
      let form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {

        //handle errors
        if(err){
          console.error(err);
          return;
        }
          let obj;
          util.inspect(obj = {fields: fields, files: files})

          let today = new Date();
            
          let hours = String(today.getHours()).padStart(2, "0");
          let minutes = String(today.getMinutes()).padStart(2, "0");
          let seconds = String(today.getSeconds()).padStart(2, "0");
          // YYYY-MM-DD H:M:S
          let DATETIME = obj.fields.DepartDate + ' ' + hours + ':' + minutes + ':' + seconds

          con.connect(function(err) {
            if (err) console.error(err);
            
            let sql = "SELECT * FROM dates WHERE departDate <='"+DATETIME+"'";
            
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("resultttt",result);

                d = result;

                console.log("this is ",d);
                let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
                let htmlRenderized = ejs.render(htmlContent,  {d} );
                res.end(htmlRenderized);
            });

            
            
            
          })
          
        })

    }



  },// end of horaires

  assets: function (data, res, req) {

    let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
    res.writeHead(200);
    res.write(assets);
    res.end("\n");
  },

  index: function (data, res, req) {
    let d = "IN THE HOME"
    
    let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
    let htmlRenderized = ejs.render(htmlContent, { d });
    res.end(htmlRenderized);
  },

  404: function (data, res, req) {
    let htmlContent = fs.readFileSync("./views/404.ejs", "utf8");
    let htmlRenderized = ejs.render(htmlContent, { data });
    res.end(htmlRenderized);
  },
};

module.exports = router;

// const requestHandler = (req, res) => {
//   let parsedURL = url.parse(req.url, true);
//   let path = parsedURL.pathname;
//   path = path.replace(/^\/+|\/+$/g, "");

//   if (path == "") {
//     let data = "";
//     let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
//     let htmlRenderized = ejs.render(htmlContent, { data, params: req.params });
//     res.end(htmlRenderized);
//   } else if (path == "horaires" && req.method.toLowerCase() == "post") {
//     console.log("inside horaires");
//     let form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       console.log(req);
//       if (err) {
//         //handle errors
//         console.error(err);
//         return;
//       }
//       var obj;
//       util.inspect((obj = { fields: fields, files: files }));
//       console.log("this is the object :", obj.fields.DepartDate);
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.write("the response\n\n");
//       res.end(util.inspect({ fields: fields, files: files }));

//       let today = new Date();

//       let hours = String(today.getHours()).padStart(2, "0");
//       let minutes = String(today.getMinutes()).padStart(2, "0");
//       let seconds = String(today.getSeconds()).padStart(2, "0");

//       let DATETIME =
//         obj.fields.DepartDate + " " + hours + ":" + minutes + ":" + seconds;
//       console.log(DATETIME);

//       con.connect(function (err) {
//         if (err) console.error(err);

//         var sql = "SELECT * FROM dates WHERE departDate <='" + DATETIME + "'";

//         con.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("resultttt", result);
//         });

//         ejs.renderFile(
//           "./views/home.ejs",
//           { result: result },
//           function (err, data) {
//             res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//             if (err) {
//               console.log(err);
//               res.end();
//             } else {
//               res.end(data);
//             }
//           }
//         );
//       });
//     });
//   }
// };

// module.exports = requestHandler;

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

// ejs.renderFile("./views/home.ejs",result, function (err, data) {
//         res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//         if (err) {
//             console.log(err);
//             res.end();
//         } else {
//             res.end(data);
//         }
//     });
