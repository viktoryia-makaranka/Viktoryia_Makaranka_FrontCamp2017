import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Blogs from './Blogs'
import AddPost from './AddPost'
import FilterPosts from './FilterPosts'

import BLOGS_API from '../modules/blogs/actions'
import { logout } from '../modules/auth/actions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  static fetchData(store) {
    return store.dispatch(BLOGS_API.fetchBlogs(this.props.isLoggedIn, this.props.author))
  }

  componentDidMount() {
    this.props.fetchBlogs(this.props.isLoggedIn, this.props.author)
  }

  render() {
    return (
      !this.props.isLoggedIn ? (
        <Redirect to='/login'/>
      ) : (
        <div>
          <button onClick={this.props.logout}>Logout</button>
          <AddPost addBlog={this.props.addBlog}/>
          <FilterPosts blogs={this.props.blogs}
                       filterBlogs={this.props.filterBlogs}
                       val={this.props.author}
                       clearFilter={this.props.clearFilter}/>
          <Blogs blogs={this.props.filteredBlogs}
                 deleteBlog={this.props.deleteBlog}/>
        </div>
      )
    )
  }
}

const mapStateToProps = ({ blogs, auth }) => ({
  blogs: blogs.blogs,
  filteredBlogs: blogs.filteredBlogs,
  author: blogs.author,
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs(isLoggedIn, author) {
    dispatch(BLOGS_API.fetchBlogs(isLoggedIn, author))
  },
  filterBlogs(author) {
    dispatch(BLOGS_API.filterBlogs(author))
  },
  clearFilter() {
    dispatch(BLOGS_API.clearFilter())
  },
  addBlog(blog) {
    dispatch(BLOGS_API.addBlog(blog))
  },
  deleteBlog(blog) {
    dispatch(BLOGS_API.deleteBlog(blog))
  },
  logout() {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
