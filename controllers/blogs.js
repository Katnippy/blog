import Router from 'express';

const blogsRouter = Router();

import Blog from '../models/blog.js';

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ?? 0
  });
  const result = await blog.save();
  response.status(201).json(result);
});

export default blogsRouter;
