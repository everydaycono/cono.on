import mysql from 'mysql2';

/**
 * Creates a connection to the database
 */
const connection = mysql.createConnection({
  host: process.env.DATABSE_CONFIG_HOST,
  user: process.env.DATABSE_CONFIG_USER,
  password: process.env.DATABSE_CONFIG_PASSWORD,
  database: process.env.DATABSE_CONFIG_DATABASE,
});

export default connection;
