import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());

const connection = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "financial_dashboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint ambil data customer, dengan pagination
app.get("/customers", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  const [rows] = await connection.query(
    "SELECT * FROM customers LIMIT ? OFFSET ?",
    [limit, offset]
  );
  res.json(rows);
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
