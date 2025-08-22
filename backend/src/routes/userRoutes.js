import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { validateUser } from "../validations/userValidation.js";

const router = express.Router();

router.post("/", validateUser, addUser); // validate user before adding
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUser, updateUser); // validate user before updating
router.delete("/:id", deleteUser);

export default router;
