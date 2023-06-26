import express from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import postsRoutes from './api/routes/posts.js';
import postRequestsRoutes from './api/routes/postRequests.js';
import usersRoutes from './api/routes/users.js';

mongoose.connect(`mongodb+srv://toniradman2903:${process.env.MONGO_ATLAS_PW}@locastic-backend-projec.ngamevn.mongodb.net/`);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use('/posts', postsRoutes);
app.use('/postRequests', postRequestsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;