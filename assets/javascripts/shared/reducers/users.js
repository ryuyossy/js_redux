import request from 'superagent';
import { USER_LIST, USER_ERROR,USER_CREATE,USER_DELETE,USER_UPDATE } from '../constants/ActionTypes';
const initialState = {users:[], user_errors: null,is_user_updated: false};
export default function users(state = initialState, action) {
  switch (action.type) {
  case USER_LIST:
    var users =  action.users.data;
    return {...state,users: users,user_errors:null,is_user_updated: false};
  case USER_ERROR:
    var errors = action.users.errors;
    var user_errors = null;
    var found = false;

    var ary = state.users.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      user_errors = errors;
    }

    return {...state,users: ary,user_errors: user_errors,is_user_updated: false};

  case USER_CREATE:
    var users = action.users.data;
    return {...state,users: [...state.users, users],user_errors:null,is_user_updated: true};

  case USER_UPDATE:
    var users = action.users.data;
    var ary = state.users.map(function(v){
      if(v.id == users.id){
        return users;
      }
      v.errors = null;
      return v;
    });
    return {...state,users: ary,user_errors:null,is_user_updated: true};

  case USER_DELETE:
    var user = action.users.data;
    var ary = state.users.filter(function(v){
      if(v.id == user.id){
        return false;
      }
      return true;
    });
    return {...state,users: ary,user_errors:null,is_user_updated: true};

  default:
    return  {...initialState, ...state ,is_user_updated: false,user_errors:null}
  }
}
