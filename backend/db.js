
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",        
  host: "localhost",
  database: "ecommerce",  
  password: "1234",       
  port: 5432,
});


pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Error connecting to PostgreSQL:", err);
  } else {
    console.log("✅ PostgreSQL Database Connected Successfully");
    release();
  }
});

module.exports = pool;
