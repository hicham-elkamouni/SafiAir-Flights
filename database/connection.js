var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "safiair_db"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db = {
  get:  (query) => {
      return new Promise( (resolve, reject) => {
          con.query(query, function (err, result) {
              if (err) throw err;
              
              resolve(result);
          });
      });
  },
};