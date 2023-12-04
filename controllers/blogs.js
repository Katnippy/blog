import Router from 'express';

const blogsRouter = Router();

import Blog from '../models/blog.js';

// POST
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

// GET
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// PUT

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).send({
      error: 'Resource already deleted or doesn\'t exist'
    });
  }
});

export default blogsRouter;
