import pool from "../db.js";
import moment from "moment-timezone";

// Helper function to convert uts date fields to IST
const convertToIST = (user) => {
  if (!user) return user;
  const fields = ["dob", "created_at", "updated_at"];
  fields.forEach((field) => {
    if (user[field]) {
      user[field] = moment(user[field])
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss");
    }
  });
  return user;
};

export const addUser = async (req, res) => {
  try {
    const { first_name, last_name, dob, mobile, address } = req.body;
    const query = `
    INSERT INTO users (first_name, last_name, dob, mobile, address) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const values = [first_name, last_name, dob, mobile, address];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to add user",
        data: null,
      });
    }
    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: convertToIST(result.rows[0]),
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to add user",
      data: null,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result.rows.map(convertToIST),
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      data: null,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, dob, mobile, address } = req.body;
    const result = await pool.query(
      `UPDATE users 
     SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5 
     WHERE id=$6 
     RETURNING *`,
      [first_name, last_name, dob, mobile, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "User updated successfully",
      data: convertToIST(result.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      data: null,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: convertToIST(result.rows[0]),
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      data: null,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      data: null,
    });
  }
};
