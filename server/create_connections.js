// utworzenia połączenia z bazą danych

let mysql = require('mysql');
console.log("Creating connection");

const link = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'barbershop'
});

link.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = link;
