import request from 'superagent';
import { PROVISIONING_ROLE_LIST, PROVISIONING_ROLE_ERROR,PROVISIONING_ROLE_CREATE,PROVISIONING_ROLE_DELETE,PROVISIONING_ROLE_UPDATE,PROVISIONING_ROLE_DETAIL } from '../constants/ActionTypes';
const initialState = {provisioningRoles:[], provisioningRoleErrors: null, isProvisioningRoleUpdated: false };
export default function provisioningRoles(state = initialState, action) {

  switch (action.type) {
  case PROVISIONING_ROLE_LIST:
    var provisioningRoles =  action.provisioningRoles.data;
    return {...state,provisioningRoles: provisioningRoles, provisioningRoleErrors:null,isProvisioningRoleUpdated:false};
  case PROVISIONING_ROLE_ERROR:
    var errors = action.provisioningRoles.errors;
    var provisioningRoleErrors = null;
    var found = false;
    var ary = state.provisioningRoles.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      provisioningRoleErrors = errors;
    }

    return {...state,provisioningRoles: ary,provisioningRoleErrors: provisioningRoleErrors,isProvisioningRoleUpdated:false};

  case PROVISIONING_ROLE_CREATE:
    var provisioningRoles = action.provisioningRoles.data;
    return {...state, provisioningRoles: [...state.provisioningRoles, provisioningRoles], provisioningRoleErrors:null,isProvisioningRoleUpdated:true};
  case PROVISIONING_ROLE_UPDATE:
    var provisioningRoles = action.provisioningRoles.data;
    var ary = state.provisioningRoles.map(function(v){
      if(v.id == provisioningRoles.id){
        return provisioningRoles;
      }
      return v;
    });
    return {...state,provisioningRoles: ary, provisioningRoleErrors:null,isProvisioningRoleUpdated:true};

  case PROVISIONING_ROLE_DELETE:
    var provisioningRole = action.provisioningRoles.data;
    var ary = state.provisioningRoles.filter(function(v){
      if(v.id == provisioningRole.id){
        return false;
      }
      return true;
    });
    return {...state,provisioningRoles: ary, provisioningRoleErrors:null,isProvisioningRoleUpdated:true};
  default:
    return  {...initialState, ...state, provisioningRoleErrors:null,isProvisioningRoleUpdated:false }
  }
}
