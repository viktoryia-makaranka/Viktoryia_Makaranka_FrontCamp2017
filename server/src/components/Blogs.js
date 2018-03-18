import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, deleteBlog }) => {
  const list = blogs.map((blog, index) =>
    <Blog key={ index } blog={ blog } deleteBlog={ deleteBlog }/>
  )
  return <div className="blogs">
    { list }
  </div>
}

export default Blogs