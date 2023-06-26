import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

export const getAllUsers = (req, res, next) => {
    User.find()
      .select("-__v")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          Users: docs.map(doc => {
            return {
              ...doc._doc
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
};

export const registerUser = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
};

export const LoginUser = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

export const getUser = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("-__v")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          User: doc,
          request: {
              type: 'GET',
              url: `${req.protocol}://${req.headers.host}/users`
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: 'user deleted'
        })
      })
      .catch(err => res.status(500).json({ error: err}))
};