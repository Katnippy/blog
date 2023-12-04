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

// POST
describe('POST', () => {
  test('A new blog can be POSTed', async () => {
    const newBlog = {
      title: 'Why Can\'t I Evolve?',
      author: 'Piplup',
      url: 'www.pochama.jp/let-me-evolve',
      likes: 393
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.jsonBlogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length + 1);

    const urls = blogs.map((blog) => blog.url);
    expect(urls).toContain(newBlog.url);
  });

  test('A blog without a likes property returns 0 likes', async () => {
    const newBlog = {
      title: 'Can a Penguin Go Insane?',
      author: 'Werner Herzog',
      url: 'www.wernerherzog.com/insane-penguin.html'
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.jsonBlogsInDb();
    expect(blogs[2].likes).toEqual(0);
  });

  test('A blog without a title property returns status code 400', async () => {
    const newBlog = {
      author: 'Pinga',
      url: 'www.pingu.jp/pinga',
      likes: 4
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.jsonBlogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length);

    const authors = blogs.map((blog) => blog.author);
    expect(authors).not.toContain(newBlog.author);
  });

  test('A blog without a url property returns status code 400', async () => {
    const newBlog = {
      title: 'Why I Love My Family',
      author: 'Pingu',
      likes: 4
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.jsonBlogsInDb();
    expect(blogs.length).toEqual(helper.initialBlogs.length);

    const authors = blogs.map((blog) => blog.author);
    expect(authors).not.toContain(newBlog.author);
  });
});

// GET
describe('GET', () => {
  test('/api/blogs returns the correct amount of posts', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('`__id` property is changed to `id`', async () => {
    const blogs = await helper.jsonBlogsInDb();
    expect(blogs[0].id).toBeDefined();
    expect(blogs[0].__id).toBeUndefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
