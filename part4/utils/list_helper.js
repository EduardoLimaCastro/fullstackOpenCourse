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

module.exports = {
  dummy,
  total_likes,
};
