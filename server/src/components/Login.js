import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import { auth } from '../modules/auth/actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.auth({
      username: this.state.username,
      password: this.state.password
    }, this.props.location.pathname === '/signin')
    event.preventDefault()
  }

  render() {
    return (
      this.props.isLoggedIn ? (
        <Redirect to='/'/>
      ) : (
        <div>
          <h1>{this.props.location.pathname === '/login' ? 'LogIn' : 'SignIn' } Page</h1>
          <form onSubmit={ this.handleSubmit }>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text"
                     name="username"
                     className="form-control"
                     value={ this.state.username }
                     onChange={ this.handleChange }
                     placeholder='username'/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="text"
                     name="password"
                     className="form-control"
                     value={ this.state.password }
                     onChange={ this.handleChange }
                     placeholder='password'/>
            </div>
            <button type='submit'>{this.props.location.pathname === '/login' ? 'Log In' : 'Sign Up' }</button>
            {this.props.location.pathname === '/login' ?
               <Link to='/signin'>Sign Up</Link> :
               <Link to='/login'>Log In</Link>}
          </form>
        </div>
      )
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  auth(authInfo, isSignIn) {
    dispatch(auth(authInfo, isSignIn))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
