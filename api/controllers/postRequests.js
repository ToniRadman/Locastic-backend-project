import mongoose from 'mongoose';

import PostRequest from '../models/postRequests.js';
import Post from '../models/posts.js'

export const getAllPostRequests = (req, res, next) => {
  if (req.userData.role === "Admin") {
    PostRequest.find()
    .select("-__v")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        postRequests: docs.map(doc => {
          return {
            ...doc._doc,
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  } else {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};

export const makePostRequest = (req, res, next) => {
  if (req.userData.role === "Admin") {
    Post.findById(req.body.postId)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            message: "Post not found"
          });
        }

        post.allowed = req.body.allowed;
        
        const postRequest = new PostRequest({
          _id: new mongoose.Types.ObjectId(),
          post: req.body.postId,
          allowed: req.body.allowed
        });
        return Promise.all([post.save(), postRequest.save()]);
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Post request stored",
          createdPostRequest: {
            _id: result._id,
            post: result.post,
            allowed: result.allowed
          }
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      });
  } else {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};