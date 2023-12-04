import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title and url are both required.'] },
  author: String,
  url: { type: String, required: [true, 'Title and url are both required.'] },
  likes: Number
});
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;