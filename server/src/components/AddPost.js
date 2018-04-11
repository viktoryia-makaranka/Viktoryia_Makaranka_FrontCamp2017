import React, { Component } from 'react'

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.addBlog = this.addBlog.bind(this);
    this.changeState = this.changeState.bind(this);
    this.state = {
      opened: false,
      title: '',
      author: '',
      body: ''
    };
  }

  addBlog() {
    this.props.addBlog({
      title: this.state.title,
      author: this.state.author,
      body: this.state.body
    });
    this.setState({
      opened: false,
      title: '',
      author: '',
      body: ''
    })
  }

  toggleState() {
    this.setState({ opened: !this.state.opened })
  }

  changeState(e) {
    const prop = e.target.name
    this.setState({ [prop]: e.target.value })
  }

  render() {
    return (
      <div className='blogs__add-form'>
        {this.state.opened ? (
          <div>
            <input name='title' value={this.state.title} onChange={this.changeState}/>
            <input name='author' value={this.state.author} onChange={this.changeState}/>
            <input name='body' value={this.state.body} onChange={this.changeState}/>
            <button onClick={ this.addBlog }>Add</button>
          </div>) :
          (<div onClick={ this.toggleState }>Add Blog</div>)
        }
      </div>
    );
  }
}