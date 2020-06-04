import actions from './actions';

const initState = null;

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case actions.USER_LOGGED_OUT:
      return initState;
    case actions.USER_LOGGED_IN:
      return action.payload;
    case actions.USER_UPDATED_SUCCESS:
      return {...state, ...action.payload.data};
    default:
      return state;
  }
}
