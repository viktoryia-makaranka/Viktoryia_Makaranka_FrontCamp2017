export const SET_AUTH_STATE = 'setAuthState'

export const auth = (creds, isSignIn) => (dispatch) => {
  const url = isSignIn ? 'signup' : 'token'
  return fetch(`http://localhost:3001/${url}`, {
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(creds)
  })
    .then(res => res.json())
    .then(res => {
      const isAuthenticated = !!res.token
      if (isAuthenticated) {
        sessionStorage.setItem('userId', res.id)
        sessionStorage.setItem('token', res.token)
      }
      dispatch({
        type: SET_AUTH_STATE,
        isLoggedIn: isAuthenticated
      })
      return isAuthenticated
    })
}

export const logout = () => (dispatch) => {
  dispatch({
    type: SET_AUTH_STATE,
    isLoggedIn: false
  })
}