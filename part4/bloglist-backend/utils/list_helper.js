const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total , blog)=>{
    return total + blog.likes
  },0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0 ) return null
  const mostLikedBlog = blogs.reduce((prev, current) => (current.likes > prev.likes ? current : prev))
  return {
    title : mostLikedBlog.title,
    author : mostLikedBlog.author,
    likes : mostLikedBlog.likes
  }
}



module.exports = {dummy, totalLikes, favouriteBlog}