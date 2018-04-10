import { SET_AUTH_STATE } from '../auth/actions'

const initialState = {
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_STATE: {
      return ({
        ...state,
        isLoggedIn: action.isLoggedIn
      })
    }

    default:
      return state
  }
}