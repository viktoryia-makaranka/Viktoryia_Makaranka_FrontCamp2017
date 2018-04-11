import 'isomorphic-fetch'
import { UPDATE_BLOGS, FILTER_BLOGS, CLEAR_FILTER } from './actions.js'

const initialState = {
  blogs: [],
  filteredBlogs: [],
  author: 'ALL'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BLOGS: {
      return ({
        ...state,
        blogs: action.blogs,
        author: action.author,
        filteredBlogs: action.filteredBlogs
      })
    }

    case FILTER_BLOGS: {
      return ({
        ...state,
        author: action.author,
        filteredBlogs: state.blogs.filter(blog => blog.author === action.author)
      })
    }

    case CLEAR_FILTER: {
      return ({
        ...state,
        author: 'ALL',
        filteredBlogs: state.blogs
      })
    }

    default:
      return state
  }
}
