const util = require("util");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  
  user: "root",
  
  password: "Gha4V33r",
  database: "employee_db"
});



connection.connect(function(err){
    if(err) throw err;
});


// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;