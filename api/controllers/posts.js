import mongoose from 'mongoose';

import Post from '../models/posts.js';

export const authGetAllPosts = (req, res, next) => {
  if (req.userData.role === "Admin") {
    Post.find()
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            ...doc._doc
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  } else {
    Post.find({ "author": req.userData.userId })
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            ...doc._doc
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }
};

export const unauthGetAllPosts = (req, res, next) => {
  Post.find({ "allowed": true })
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            ...doc._doc
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

export const makePost = (req, res, next) => {
    const blogPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        timestamp: Date.now(),
        author: req.userData.userId,
        allowed: req.body.allowed
    });
    blogPost
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        createdPost: {
          ...result.toObject({ versionKey: false })
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

export const getPost = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .select("-__v")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          post: doc
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

export const editPost = (req, res, next) => {
  const id = req.params.postId;
  const { title, content } = req.body;
  const updateFields = { title, content };
  Post.findByIdAndUpdate(id, { $set: updateFields }, { new: true})
    .then(() => {
      res.status(200).json({
        message: 'Post updated'
      })
    })
    .catch(err => res.status(500).json({ error: err}))
};

export const deletePost = (req, res, next) => {
  if ( req.userData.role === "Admin") {
    const id = req.params.postId;
    Post.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: 'Post deleted'
        })
      })
      .catch(err => res.status(500).json({ error: err}))
  }
};