const express = require("express");
const checkAuth = require("../middleware/auth");
const PostController = require("../controllers/posts");

const router = express.Router();

router.post("", checkAuth, PostController.createPost);
router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);
router.put("/:id", checkAuth, PostController.updatePost);
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;