import Blog from '../models/blog.js';

const initialBlogs = [
  {
    title: 'All 18 Penguin Species Ranked Best to Equally Best',
    author: 'Ferdinand Magellan',
    url: 'www.magellanblog.com/penguins_ranked',
    likes: 1520
  },
  {
    title: 'My Life as a Chicken',
    author: 'Feathers McGraw',
    url: 'www.ilovebeingachicken.com/my_life',
    likes: 1993
  },
];

async function jsonBlogsInDb() {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
}

export default { initialBlogs, jsonBlogsInDb };
