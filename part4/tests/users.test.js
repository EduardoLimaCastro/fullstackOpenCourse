const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const helper = require("./helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("Post with 2 characters in username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ml",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
