const dummy = (blogs) => {
  return 1;
};

const total_likes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  if (blogs.length === 1) {
    likes = blogs[0].likes;
    return likes;
  } else {
    let sum = 0;
    for (n = 0; n < blogs.length; n++) {
      sum = sum + blogs[n].likes;
    }
    return sum;
  }
};

const favorite_blog = (blogs) => {
  let favorite = {
    title: "a",
    author: "a",
    likes: 0,
  };
  for (let n = 0; n < blogs.length; n++) {
    if (blogs[n].likes > favorite.likes) {
      favorite = {
        title: blogs[n].title,
        author: blogs[n].author,
        likes: blogs[n].likes,
      };
    }
  }
  return favorite;
};

const most_blogs = (blogs) => {
  const authorCount = {};
  let mostAuthor = {
    author: "",
    blogs: 0,
  };
  blogs.forEach((blog) => {
    const author = blog.author;
    authorCount[author] = (authorCount[author] || 0) + 1;
  });
  const authorCountArray = Object.entries(authorCount).map(
    ([author, count]) => ({ author, count })
  );
  const sortedAuthorCount = authorCountArray.sort((a, b) => b.count - a.count);
  mostAuthor = {
    author: sortedAuthorCount[0].author,
    blogs: sortedAuthorCount[0].count,
  };
  return mostAuthor;
};

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
  most_blogs,
};
