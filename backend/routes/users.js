const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const { addUser } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");

router.post("/", addUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
