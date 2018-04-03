import React, { Component } from 'react'
import { connect } from 'react-redux'

import Blogs from './Blogs'
import AddPost from './AddPost'
import FilterPosts from './FilterPosts'

import BLOGS_API from '../modules/blogs/blogsActions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  static fetchData(store) {
    return store.dispatch(BLOGS_API.fetchBlogs(this.props.author))
  }

  componentDidMount() {
    this.props.fetchBlogs(this.props.author)
  }

  render() {
    return (
      <div>
        <AddPost addBlog={ this.props.addBlog }/>
        <FilterPosts blogs={ this.props.blogs }
                     filterBlogs={ this.props.filterBlogs }
                     val={ this.props.author }
                     clearFilter={ this.props.clearFilter }/>
        <Blogs blogs={ this.props.filteredBlogs }
               deleteBlog={ this.props.deleteBlog }/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blogs: state.blogs.blogs,
  filteredBlogs: state.blogs.filteredBlogs,
  author: state.blogs.author
});

const mapDispatchToProps = dispatch => ({
  fetchBlogs(author) {
    dispatch(BLOGS_API.fetchBlogs(author))
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
