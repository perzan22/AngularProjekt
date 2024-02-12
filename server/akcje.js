const link = require('./create_connections');


class Akcje {

    // obsługa zapytania GET
    getData(req, res) {
        const { sql } = req.query;
        console.log('SQL GET query recieved: ' + sql);
        link.query(sql, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.table(results);
        res.status(200).json(results);
        });
    };

    // obsługa zapytania INSERT z parametrami
    postInsert(req, res) {
        const sql = req.body.sql;
        const params = req.body.params;
        console.log('SQL POST query recieved: ' + sql);
        link.query(sql, params, function (err, result, fields) {
          if (err) return res.status(422).json({message: err.message});
          console.table(result);
          const insertId = result.insertId;
          res.status(200).json({insertId: insertId});
        });
    }

    // obsługa zapytania SELECT z parametrami
    postSelectParams(req, res) {
        const sql = req.body.sql;
        const params = req.body.params;
        console.log('SQL POST query recieved: ' + sql);
        link.query(sql, params, function (err, result, fields) {
          if (err) return res.status(422).json({message: err.message});
          console.table(result);
          res.status(200).json(result);
        });
    } 

    // obsługa zapytania SELECT bez parametrów
    postSelect(req, res) {
        const sql = req.body.sql;
        console.log('SQL POST query recieved: ' + sql);
        link.query(sql, function (err, result, fields) {
          if (err) return res.status(422).json({message: err.message});
          console.table(result);
          res.status(200).json(result);
        });
    }
}

module.exports = new Akcje();