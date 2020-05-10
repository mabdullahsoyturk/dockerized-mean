const express = require("express");
const Post = require("../models/post");
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.post("", checkAuth, (req,res,next) => {
  post = new Post({ 
    title: req.body.title, 
    content: req.body.content,
    creator: req.userData.userId 
  });
  post.save().then(result => {
    res.status(201).json({
      message:"Post Added Successfully",
      id: result._id
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
        message:"Posts fetched",
        posts: documents
    });
  });
});

router.get("/:id", (req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    }else {
      res.status(404).json({message:"Not found"});
    }
  })
})

router.put("/:id", checkAuth, (req,res,next) => {
  const post = ({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });

  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if(result.nModified > 0) {
      res.status(200).json({ message: "Update Sucessful" });
    }else {
      res.status(401).json({ message: "User is not authorized to update this post" });
    }
  });
});

router.delete("/:id", checkAuth, (req,res,next) => {
  Post.deleteOne({_id:req.params.id, creator: req.userData.userId }).then(result => {
    if(result.n > 0) {
      return res.status(200).json({ mmesage: "Post Deleted" });
    }else {
      return res.status(401).json({ mmesage: "User is not authorized to delete this post" });
    }
  });
});

module.exports = router;