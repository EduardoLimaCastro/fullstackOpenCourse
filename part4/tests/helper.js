const Blog = require("../models/blog");

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const amountOfBlogs = async () => {
  const blogs = await Blog.find({});
  const amount = blogs.length;
  return amount;
};

module.exports = {
  nonExistingId,
  blogsInDb,
  amountOfBlogs,
};
