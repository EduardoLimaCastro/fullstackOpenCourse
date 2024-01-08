const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blog has id property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
