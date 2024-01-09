const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./helper");

const api = supertest(app);

describe("update a Blog", () => {
  test("updated blog", async () => {
    const db = await helper.blogsInDb();
    const length = db.length;
    const id = db[length - 1].id;
    const newBlog = {
      title: db[length - 1].title,
      author: db[length - 1].author,
      url: db[length - 1].url,
      likes: 55,
    };
    await api.put(`/api/blogs/${id}`).send(newBlog).expect(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
