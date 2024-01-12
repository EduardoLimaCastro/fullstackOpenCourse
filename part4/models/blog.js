const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

// const url = process.env.MONGODB_URI;

//console.log("connecting to", url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.user.blogs;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
