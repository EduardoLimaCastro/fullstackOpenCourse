const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const helper = require("./helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("post tests", () => {
  test("Verifies POST request", async () => {
    const newBlog = {
      title: "hello world",
      author: "Eduardo Castro",
      url: "www.hello.com",
      likes: "12",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("if likes is missing it sets to zero", async () => {
    const newBlog = {
      title: "hello world",
      author: "Eduardo Castro",
      url: "www.hello.com",
    };
    if ("likes" in newBlog) {
      const newBlog = {
        title: "hello world",
        author: "Eduardo Castro",
        url: "www.hello.com",
        likes: "12",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    } else {
      const newBlog2 = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0,
      };
      await api
        .post("/api/blogs")
        .send(newBlog2)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    }
  });
  test("blog without title", async () => {
    newBlog = {
      author: "Eduardo Castro",
      url: "www.hello.com",
      likes: "12",
    };
    api.post("/api/blogs", (req, res) => {
      if (!req.body.hasOwnProperty("title")) {
        // If the property is missing, send a 400 Bad Request response
        return res
          .status(400)
          .json({ error: "Missing required property: title" });
      }
    });
  });
  //   test('fails with status code 400 if data invalid', async () => {
  //     const newBlog = {
  //       title: "olá"
  //     }

  //     await api
  //       .post('/api/notes')
  //       .send(newNote)
  //       .expect(400)

  //     const blogsAtEnd = await helper.notesInDb()

  //     expect(blogsAtEnd).toHaveLength(helper.initialNotes.length)
  //   })
});

afterAll(async () => {
  await mongoose.connection.close();
});
