import React from 'react';

import Blog from './Blog'

const Blogs = ({ blogs, deleteBlog }) => {
  return (
    <div className="blogs">
      { blogs && blogs.length ?
        blogs.map((blog, index) => {
          return (
            <Blog key={ index } blog={ blog } deleteBlog={ deleteBlog }/>
          )
        }) :
        <h2>No blogs found</h2>
      }
    </div>
  )
}

export default Blogs;