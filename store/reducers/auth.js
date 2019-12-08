import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: 
      return initialState;
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    default:
      return state;
  }
};
