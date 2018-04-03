import 'isomorphic-fetch'

export const UPDATE_BLOGS = 'updateBlogs'
export const FILTER_BLOGS = 'filterBlogs'
export const CLEAR_FILTER = 'clearFilter'

const BLOGS_API = {
  fetchBlogs: (author) => (dispatch) => {
    return fetch('http://localhost:3001/blogs', {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(blogs => {
        const filteredBlogs = author === 'ALL' ? blogs : blogs.filter(blog => blog.author === author)
        dispatch({
          type: UPDATE_BLOGS,
          author,
          blogs,
          filteredBlogs: filteredBlogs.length ? filteredBlogs : blogs
        })
      })
  },

  filterBlogs: author => ({
    type: FILTER_BLOGS,
    author
  }),

  clearFilter: () => ({
    type: CLEAR_FILTER
  }),

  addBlog: blog => (dispatch) => {
    return fetch('http://localhost:3001/blogs', {
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify([blog])
    })
      .then(() => {
        dispatch(BLOGS_API.fetchBlogs('ALL'))
      })
  },

  deleteBlog: blog => (dispatch) => {
    return fetch(`http://localhost:3001/blogs/${blog._id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE'
    }).then(() => {
      dispatch(BLOGS_API.fetchBlogs(blog.author))
    })
  }
}

export default BLOGS_API
