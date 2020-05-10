const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/signup", (req,res,next) => {
  console.log("User add executed");
  console.log(req.body);

  bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({ 
            email: req.body.email, 
            password: hash 
          });
          user.save().then(result => {
            console.log(result);
            res.status(201).json({
              message:"User Added Successfully",
              id: result._id
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
        });
});

router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
        message:"Users fetched",
        users: documents
    });
  });
});

router.get("/:id", (req,res,next) => {
  User.findById(req.params.id).then(user => {
    if(user) {
      res.status(200).json(user);
    }else {
      res.status(404).json({message:"Not found"});
    }
  })
})

router.put("/:id", (req,res,next) => {
  console.log("User update executed");
  console.log(req.body);
  User.updateOne({_id: req.params.id}, { email: req.body.email, password: req.body.password }).then(result => {
    res.status(200).json({ message: "Update Sucessful" });
  });
});

router.delete("/:id", (req,res,next) => {
  User.deleteOne({_id:req.params.id}).then(result => {
    return res.status(200).json({ message: "User Deleted" });
  });
});

module.exports = router;