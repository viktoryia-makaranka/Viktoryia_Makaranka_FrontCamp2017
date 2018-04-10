import 'isomorphic-fetch'

import { SET_AUTH_STATE } from '../auth/actions'

export const UPDATE_BLOGS = 'updateBlogs'
export const FILTER_BLOGS = 'filterBlogs'
export const CLEAR_FILTER = 'clearFilter'

const authParamsString = () => `?token=${sessionStorage.getItem('token')}&userId=${sessionStorage.getItem('userId')}`

const BLOGS_API = {
  fetchBlogs: (isLoggedIn, author) => (dispatch) => {
    if (!isLoggedIn) return
    return fetch(`http://localhost:3001/blogs${authParamsString()}`)
      .then(res => res.json())
      .then(blogs => {
        dispatch({
          type: SET_AUTH_STATE,
          isLoggedIn: true
        })
        if (!blogs) return
        const filteredBlogs = author === 'ALL' ? blogs : blogs.filter(blog => blog.author === author)
        dispatch({
          type: UPDATE_BLOGS,
          author,
          blogs,
          filteredBlogs: filteredBlogs.length ? filteredBlogs : blogs
        })
      })
      .catch (() => {
        dispatch({
          type: SET_AUTH_STATE,
          isLoggedIn: false
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
    return fetch(`http://localhost:3001/blogs${authParamsString()}`, {
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
    return fetch(`http://localhost:3001/blogs/${blog._id}${authParamsString()}`, {
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
