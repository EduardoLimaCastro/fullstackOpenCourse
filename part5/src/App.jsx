import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotificationError from "../src/components/NotificationMessages/NotificationError";
import NotificationSuccess from "../src/components/NotificationMessages/NotificationSuccess";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucsessMessage, setSucsessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    console.log(user);
  };

  const loginForm = () => (
    <>
      <NotificationError message={errorMessage}></NotificationError>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    };

    console.log(blogObject);
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });

    setSucsessMessage(`A new blog ${newTitle} added`);
  };

  const blogForm = () => (
    <>
      <form
        onSubmit={addBlog}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </label>
        <label>
          URL:
          <input
            type="text"
            name="url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </label>
        <button type="submit" style={{ width: "80px", textAlign: "center" }}>
          Create
        </button>
      </form>
      <div style={{ display: "flex", gap: "25px" }}>
        <p>{user.name} is logged in</p>
        <button
          onClick={() => {
            window.localStorage.clear();
            location.reload();
          }}
        >
          Log-out
        </button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return (
    <div>
      <h2>blogs</h2>
      <NotificationSuccess message={sucsessMessage}></NotificationSuccess>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
