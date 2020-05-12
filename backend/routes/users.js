const express = require("express");
const UserController = require("../controllers/users");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);

router.get("", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;