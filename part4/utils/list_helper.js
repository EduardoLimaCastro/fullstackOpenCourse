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

module.exports = {
  dummy,
  total_likes,
  favorite_blog,
};
