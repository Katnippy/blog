import Router from 'express';
const blogsRouter = Router();

import Blog from '../models/blog.js';

// ! We're not handling errors! Import express-async-errors!
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

export default blogsRouter;
