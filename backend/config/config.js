require('dotenv').config();

module.exports = {
    development: {
      username: process.env.SQL_DB_USER,
      password: process.env.SQL_DB_PWD,
      database: process.env.SQL_DB_NAME,
      host: process.env.SQL_DB_HOSTNAME,
      port: 3306,
      dialect: 'mysql',
      dialectOptions: {
        bigNumberStrings: true
      }
    },
}