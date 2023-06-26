import mongoose from 'mongoose';

import PostRequest from '../models/postRequests.js';
import Post from '../models/posts.js'

export const getAllPostRequests = (req, res, next) => {
    PostRequest.find()
      .select("-__v")
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          postRequests: docs.map(doc => {
            return {
              ...doc._doc,
              request: {
                type: "GET",
                url: `${req.protocol}://${req.headers.host}${req.url}/postRequests/${doc._id}`
              }
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

export const makePostRequest = (req, res, next) => {
    Post.findById(req.body.postId)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            message: "Post not found"
          });
        }
        const postRequest = new PostRequest({
          _id: new mongoose.Types.ObjectId(),
          post: req.body.postId,
          allowed: req.body.allowed
        });
        return postRequest.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Post request stored",
          createdPostRequest: {
            _id: result._id,
            post: result.post,
            allowed: result.allowed
          },
          request: {
            type: "GET",
            url: `${req.protocol}://${req.headers.host}${req.url}/postRequests/${result._id}`
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

export const getPostRequest = (req, res, next) => {
    const id = req.params.postRequestId;
    PostRequest.findById(id)
      .select("-__v")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            postRequest: doc,
            request: {
                type: 'GET',
                url: `${req.protocol}://${req.headers.host}/postRequests`
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

export const deletePostRequest = (req, res, next) => {
    const id = req.params.postRequestId;
    PostRequest.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: 'Blog Post request deleted',
          request: {
              type: 'POST',
              url: `${req.protocol}://${req.headers.host}/postRequests`,
              body: { post:'ID', allowed:'Boolean'}
          }
        })
      })
      .catch(err => res.status(500).json({ error: err}))
};