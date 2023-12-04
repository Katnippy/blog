import app from '../app.js';
import supertest from 'supertest';
import helper from './test-helper.js';
import mongoose from 'mongoose';
import Blog from '../models/blog.js';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// GET
test('/api/blogs returns the correct amount of posts', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
