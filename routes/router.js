const ejs = require("ejs");
const fs = require("fs");
const util = require("util");
const formidable = require("formidable");
const path = require("path");

const db = require("../database/connection");
const fetch = require('../model/queries');

router = {
  horaires: function (data, res, req) {

    let flights = [];
    console.log(req.method);
    // get the inserted data from front 
    if (req.method === "POST") {
      console.log("INSIDE POST METHOD")
      let form = new formidable.IncomingForm();
      form.parse(req, async function(err, fields, files) {

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
          
          console.log(typeof obj.fields.places);
          flights =await db.get(fetch.getFlights(obj.fields.DepartStation, obj.fields.ArrivalStation, DATETIME, obj.fields.places));
            
          console.log(flights)
          
            console.log("this is ", flights);
            let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
            let htmlRenderized = ejs.render(htmlContent,  {flights} );
            res.end(htmlRenderized);
        })

    }

  },// end of horaires

  booking: async function (data, res, req) {

    
    // get data from front 
    if (req.method === "POST") {
      console.log("INSIDE Booking METHOD")
      let form = new formidable.IncomingForm();
      form.parse(req, async function(err, fields, files) {

        //handle errors
        if(err){
          console.error(err);
          return;
        }
          let obj;
          util.inspect(obj = {fields: fields, files: files})
          
          console.log(obj);
          id =await db.get(fetch.insertClient(obj.fields.fName, obj.fields.lName, obj.fields.email, obj.fields.passport, obj.fields.tel));
          // id =await db.get(fetch.insertClient(obj.fields.fName, obj.fields.lName, obj.fields.email, obj.fields.passport, obj.fields.tel));
            
          console.log(id.insertId);

          console.log(obj.fields.flight_id)

          id_reservation =await db.get(fetch.book(id.insertId, obj.fields.flight_id));

          console.log("this is reservation id :", id_reservation);
          //   console.log("this is ", flights);
          //   let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
          //   let htmlRenderized = ejs.render(htmlContent,  {flights} );
          //   res.end(htmlRenderized);
        })

    }

  },

  assets: function (data, res, req) {

    let assets = fs.readFileSync(path.join(__dirname + "/.." + data.url));
    res.writeHead(200);
    res.write(assets);
    res.end("\n");
  },

  index: function (data, res, req) {
    let flights = []
    
    let htmlContent = fs.readFileSync("./views/home.ejs", "utf8");
    let htmlRenderized = ejs.render(htmlContent, { flights });
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
