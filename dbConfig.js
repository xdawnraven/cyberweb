require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://postgres:vdMZLdU25Y1ycVEIK5r4@containers-us-west-43.railway.app:6394/railway`;

const pool = new Pool({
  connectionString: 'postgresql://postgres:vdMZLdU25Y1ycVEIK5r4@containers-us-west-43.railway.app:6394/railway',
  ssl: isProduction
});

module.exports = { pool };
