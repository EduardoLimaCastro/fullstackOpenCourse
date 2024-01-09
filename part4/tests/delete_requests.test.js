const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const helper = require("./helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("delete posts", () => {
  test("delete post", async () => {
    const blogsStart = await helper.blogsInDb();
    const length = blogsStart.length;
    const blogDeleted = blogsStart[length - 1];

    await api.delete(`/api/blogs/${blogDeleted.id}`).expect(204);

    const blogsEnd = await helper.blogsInDb();

    expect(blogsEnd).toHaveLength(length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
