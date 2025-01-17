const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.createUser = (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = new User({ 
              email: req.body.email, 
              password: hash 
            });
            user.save().then(result => {
              res.status(201).json({
                message:"User Added Successfully",
                id: result._id
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
          });
  }

exports.loginUser = (req,res,next) => {
    let fetchedUser;
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
              return res.status(401).json({
                message: "Auth failed"
              })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
          if(!result) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, "secret_string_to_create_token", {expiresIn: "1h"});
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
          });
        })
        .catch(err => {
          return res.status(401).json({
            message: "Auth failed"
          });
        });
  }

exports.getUsers = (req, res, next) => {
    User.find().then(documents => {
        res.status(200).json({
            message:"Users fetched",
            users: documents
        });
    });
}

exports.getUser = (req,res,next) => {
    User.findById(req.params.id).then(user => {
        if(user) {
        res.status(200).json(user);
        }else {
        res.status(404).json({message:"Not found"});
        }
    });
}
exports.updateUser = (req,res,next) => {
    User.updateOne({_id: req.params.id}, { email: req.body.email, password: req.body.password }).then(result => {
      res.status(200).json({ message: "Update Sucessful" });
    });
}

exports.deleteUser = (req,res,next) => {
    User.deleteOne({_id:req.params.id}).then(result => {
      return res.status(200).json({ message: "User Deleted" });
    });
}
