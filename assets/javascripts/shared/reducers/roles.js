import request from 'superagent';
import { ROLE_LIST, ROLE_ERROR,ROLE_CREATE,ROLE_DELETE,ROLE_UPDATE,ROLE_DETAIL } from '../constants/ActionTypes';
const initialState = {roles:[], roleErrors: null, isRoleUpdated: false };
export default function roles(state = initialState, action) {

  switch (action.type) {
  case ROLE_LIST:
    var roles =  action.roles.data;
    return {...state,roles: roles, roleErrors:null,isRoleUpdated:false};
  case ROLE_ERROR:
    var errors = action.roles.errors;
    var roleErrors = null;
    var found = false;
    var ary = state.roles.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      roleErrors = errors;
    }
    return {...state,roles: ary,roleErrors: roleErrors,isRoleUpdated:false};
  case ROLE_CREATE:
    var roles = action.roles.data;
    return {...state, roles: [...state.roles, roles], roleErrors:null,isRoleUpdated:true};
  case ROLE_UPDATE:
    var roles = action.roles.data;
    var ary = state.roles.map(function(v){
      if(v.id == roles.id){
        return roles;
      }
      return v;
    });
    return {...state,roles: ary, roleErrors:null,isRoleUpdated:true};
  case ROLE_DELETE:
    var role = action.roles.data;
    var ary = state.roles.filter(function(v){
      if(v.id == role.id){
        return false;
      }
      return true;
    });
    return {...state,roles: ary, roleErrors:null,isRoleUpdated:true};
  default:
    return  {...initialState, ...state, roleErrors:null,isRoleUpdated:false }
  }
}
