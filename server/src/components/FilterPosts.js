import React from 'react'

const FilterPosts = ({ blogs, filterBlogs, clearFilter, val }) => {
  const emitFilterPosts = (e) => {
    if (e.target.value === 'ALL') {
      clearFilter()
    } else {
      filterBlogs(e.target.value)
    }
  }

  let authorsSet = new Set()
  if (blogs && blogs.length) {
    blogs.forEach((blog) => authorsSet.add(blog.author))
  }
  const authors = Array.from(authorsSet)

  const list = authors.map((author, index) =>
    <option key={ index } value={ author }>{ author }</option>
  )

  return <select className="blogs__filter" value={ val } onChange={ emitFilterPosts }>
    <option value='ALL'>ALL</option>
    { list }
  </select>
}

export default FilterPosts