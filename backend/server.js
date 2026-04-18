


const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Backend + PostgreSQL Connected 🚀" });
});

app.get("/api/products", async (req, res) => {
  try {
    console.log("📦 Fetching products...");
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});


app.post("/api/register", async (req, res) => {
  console.log("🔥 Register API called:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
 
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

   
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );

    console.log("✅ User inserted:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("🔐 Login API called:", req.body);

  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/cart", async (req, res) => {
  console.log("🛒 Add to cart:", req.body);

  const { user_id, product_id, quantity } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity || 1]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Cart Error:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});


app.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT cart.*, products.name, products.price, products.image 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Fetch Cart Error:", error);
    res.status(500).json({ error: "Error fetching cart" });
  }
});

app.post("/api/orders", async (req, res) => {
  console.log("💳 Order API called:", req.body);

  const { user_id, total_price } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
      [user_id, total_price]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Order Error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
