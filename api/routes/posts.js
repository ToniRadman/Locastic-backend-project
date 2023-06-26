import { Router } from 'express';
const router = Router();
import mongoose from 'mongoose';

import Post from '../models/posts.js';

router.get("/", (req, res, next) => {
  Post.find()
    .select("-__v")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            ...doc._doc,
            request: {
              type: "GET",
              url: `${req.protocol}://${req.headers.host}${req.url}posts/${doc._id}`
            }
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
});

router.post('/', (req, res, next) => {
    const blogPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        timestamp: Date.now(),
        author: req.body.author,
        allowed: req.body.allowed
    });
    blogPost
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        createdPost: {
          ...result.toObject({ versionKey: false }),
          request: {
            type: "GET",
            url: `${req.protocol}://${req.headers.host}${req.url}posts/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:postId", (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
      .select("-__v")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            post: doc,
            request: {
                type: 'GET',
                url: `${req.protocol}://${req.headers.host}/posts`
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
  });

  router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.findByIdAndUpdate(id, { $set: req.body }, { new: true})
      .then(() => {
        res.status(200).json({
          message: 'Post updated',
          request: {
              type: 'GET',
              url: `${req.protocol}://${req.headers.host}/posts/${id}`
          }
        })
      })
      .catch(err => res.status(500).json({ error: err}))
  });
  
  router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: 'Post deleted',
          request: {
              type: 'POST',
              url: `${req.protocol}://${req.headers.host}/posts`,
              body: { title:'String', content:'String'}
          }
        })
      })
      .catch(err => res.status(500).json({ error: err}))
  });

export default router;