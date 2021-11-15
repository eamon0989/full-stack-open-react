const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  return list.reduce((acc, obj) => acc + obj.likes, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => +blog.likes === +maxLikes)
} 

module.exports = {
  dummy, totalLikes, favoriteBlog
}
