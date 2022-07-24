const AWSXRay = require('aws-xray-sdk-core')
const captureMySQL = require('aws-xray-sdk-mysql')
const mysql = captureMySQL(require('mysql2/promise'))

exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host     : process.env.db_host,
    database : process.env.db_schema,
    user     : process.env.db_username,
    password : process.env.db_password
  })

//   const [rows, fields] = await connection.execute(event.arguments.query)
//   console.log(rows)
//   await connection.end()
//   return rows

  const [rows, fields] = await connection.execute(event.arguments.query)
  await connection.end()
  return JSON.stringify(rows)
}
