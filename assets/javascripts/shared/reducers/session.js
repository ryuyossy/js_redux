import request from 'superagent';
import { SESSION_LOGIN,SESSION_ERROR } from '../constants/ActionTypes';
const initialState = {
  user: {}
}

export default function session(state = initialState, action) {
  switch (action.type) {
  case SESSION_LOGIN:
    let user =  action.user;
    return  user;
  case SESSION_ERROR:
    return {errors: action.errors};
  default:
    return  {...initialState, ...state }
  }
}
