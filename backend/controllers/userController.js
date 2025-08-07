const pool = require("../db");

const addUser = async (req, res) => {
  const { first_name, last_name, dob, mobile, address } = req.body;
  const query = `INSERT INTO users (first_name, last_name, dob, mobile, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [first_name, last_name, dob, mobile, address];
  const result = await pool.query(query, values);
  res.json(result.rows[0]);
};

const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, dob, mobile, address } = req.body;
  const result = await pool.query(
    `UPDATE users SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5 WHERE id=$6 RETURNING *`,
    [first_name, last_name, dob, mobile, address, id]
  );
  res.json(result.rows[0]);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.json({ message: "Deleted successfully" });
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
