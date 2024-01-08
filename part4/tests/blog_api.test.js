const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./helper");

const api = supertest(app);

test("Blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("Amount of blogs", async () => {
  const response = await api.get("/api/blogs");
  const amount = await helper.amountOfBlogs();
  expect(response.body).toHaveLength(amount);
});

afterAll(async () => {
  await mongoose.connection.close();
});
