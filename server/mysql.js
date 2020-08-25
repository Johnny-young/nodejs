const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')
const connection = mysql.createConnection(MYSQL_CONFIG)
connection.connect()

const query = (sql) => {
  console.log('sql: ', sql)
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

module.exports = {
  query,
  esacpe: mysql.escape
}