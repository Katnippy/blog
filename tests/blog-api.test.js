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

afterAll(async () => {
  await mongoose.connection.close();
});
