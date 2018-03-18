import React from 'react'

const Blog = ({ blog, deleteBlog }) => {
  const emitDelete = () => {
    deleteBlog(blog)
  }
  return <div className="blogs__item">
    <h2>{ blog.title }</h2>
    <h3>{ blog.author }</h3>
    <div>{ blog.body }</div>
    <div onClick={ emitDelete }>Delete</div>
  </div>
}


export default Blog