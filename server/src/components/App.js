import React, { Component } from 'react'
import Blogs from './Blogs'
import AddPost from './AddPost'
import FilterPosts from './FilterPosts'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addBlog = this.addBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.showAll = this.showAll.bind(this);
    this.state = {
      blogs: [],
      shownBlogs: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/blogs', {
      headers: {
        'content-type': 'application/json'
      },
    }).then(response => response.json())
      .then(response => {
        this.setState({
          blogs: response,
          shownBlogs: response
        })
      })
      .catch(error => {
        alert(error)
      });
  }

  addBlog(blog) {
    this.setState({ blogs: [blog, ...this.state.blogs] })
    fetch('http://localhost:3001/blogs', {
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify([blog])
    })
  }

  deleteBlog(blog) {
    let blogs = this.state.blogs
    const indexOfBlog = blogs.indexOf(blog)
    blogs.splice(indexOfBlog, 1)
    this.setState({ blogs: blogs })
    fetch(`http://localhost:3001/blogs/${blog._id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE'
    })
  }

  filterPosts(author) {
    this.setState({ shownBlogs: this.state.blogs.filter(blog => blog.author === author) })
  }

  showAll() {
    this.setState({ shownBlogs: this.state.blogs })
  }

  authors() {
    let authorsSet = new Set()
    this.state.blogs.forEach((blog) => authorsSet.add(blog.author))
    return Array.from(authorsSet)
  }

  render() {
    return (
      <div>
        <AddPost addBlog={ this.addBlog }/>
        <FilterPosts authors={ this.authors() } filterPosts={ this.filterPosts } showAll={ this.showAll }/>
        <Blogs blogs={ this.state.shownBlogs } deleteBlog={ this.deleteBlog }/>
      </div>
    );
  }
}