const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req,res,next) => {
  console.log("Backed add executed");
  console.log(req.body);
  post = new Post({ title: req.body.title, content: req.body.content });
  post.save().then(result => {
    console.log(result);
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

router.put("/:id", (req,res,next) => {
  console.log("Backed update executed");
  console.log(req.body);
  Post.updateOne({_id: req.params.id}, { title: req.body.title, content: req.body.content }).then(result => {
    res.status(200).json({ message: "Update Sucessful" });
  });
});

router.delete("/:id", (req,res,next) => {
  Post.deleteOne({_id:req.params.id}).then(result => {
    return res.status(200).json({ mmesage: "Post Deleted" });
  });
});

module.exports = router;