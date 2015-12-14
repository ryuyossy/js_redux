import request from 'superagent';
import { ORGANIZATION_LIST, ORGANIZATION_ERROR,ORGANIZATION_CREATE,ORGANIZATION_DELETE,ORGANIZATION_UPDATE,ORGANIZATION_DETAIL,GET_USER_MASETER_FOR_ORGANIZATION } from '../constants/ActionTypes';
const initialState = {organizations:[], organization_errors: null, is_organization_updated: false, user_master_for_organization: [] };
export default function organizations(state = initialState, action) {

  switch (action.type) {
  case ORGANIZATION_LIST:
    var organizations =  action.organizations.data;
    return {...state,organizations: organizations, organization_errors:null,is_organization_updated:false};
  case ORGANIZATION_ERROR:
    var errors = action.organizations.errors;
    var organization_errors = null;
    var found = false;
    var ary = state.organizations.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      organization_errors = errors;
    }
    return {...state,organizations: ary,organization_errors: organization_errors,is_organization_updated:false};

  case ORGANIZATION_CREATE:
    var organizations = action.organizations.data;
    return {...state, organizations: [...state.organizations, organizations], organization_errors:null,is_organization_updated:true};
  case ORGANIZATION_UPDATE:
    var organizations = action.organizations.data;
    var ary = state.organizations.map(function(v){
      if(v.id == organizations.id){
        return organizations;
      }
      return v;
    });
    return {...state,organizations: ary, organization_errors:null,is_organization_updated:true};

  case ORGANIZATION_DELETE:
    var organization = action.organizations.data;
    var ary = state.organizations.filter(function(v){
      if(v.id == organization.id){
        return false;
      }
      return true;
    });
    return {...state,organizations: ary, organization_errors:null,is_organization_updated:true};
  case GET_USER_MASETER_FOR_ORGANIZATION:
    var users = action.users.data;
    var ary = users.map(function(v){
      return {text: v.first_name+" "+v.last_name, payload: v.id};
    });
    ary = [{text: "Choose organization maanger", payload:""}, ...ary]
    return {...state, organization_errors:null,is_organization_updated:false, user_master_for_organization: ary};
  default:
    return  {...initialState, ...state, organization_errors:null,is_organization_updated:false }
  }
}
