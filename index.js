const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM Testing LIMIT 1");

    if (result.rows.length === 0) {
      return res.send("레코드가 없습니다.");
    }

    const name = result.rows[0].name;
    res.send(`HELLO ${name}`);
  } catch (err) {
    console.error("DB 조회 오류:", err);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
