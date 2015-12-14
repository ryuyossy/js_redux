import request from 'superagent';
import { POTENTIAL_RESPONSE_LIST, POTENTIAL_RESPONSE_ERROR,POTENTIAL_RESPONSE_CREATE,POTENTIAL_RESPONSE_DELETE,POTENTIAL_RESPONSE_UPDATE,POTENTIAL_RESPONSE_DETAIL } from '../constants/ActionTypes';
const initialState = {potentialResponses:[], potentialResponseErrors: null, isPotentialResponseUpdated: false };
export default function potentialResponses(state = initialState, action) {

  switch (action.type) {
  case POTENTIAL_RESPONSE_LIST:
    var potentialResponses =  action.potentialResponses.data;
    return {...state,potentialResponses: potentialResponses, potentialResponseErrors:null,isPotentialResponseUpdated:false};
  case POTENTIAL_RESPONSE_ERROR:
    var errors = action.potentialResponses.errors;
    var potentialResponseErrors = null;
    var found = false;
    var ary = state.potentialResponses.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      potentialResponseErrors = errors;
    }
    return {...state,potentialResponses: ary,potentialResponseErrors: potentialResponseErrors,isPotentialResponseUpdated:false};
  case POTENTIAL_RESPONSE_CREATE:
    var potentialResponses = action.potentialResponses.data;
    return {...state, potentialResponses: [...state.potentialResponses, potentialResponses], potentialResponseErrors:null,isPotentialResponseUpdated:true};
  case POTENTIAL_RESPONSE_UPDATE:
    var potentialResponses = action.potentialResponses.data;
    var ary = state.potentialResponses.map(function(v){
      if(v.id == potentialResponses.id){
        return potentialResponses;
      }
      return v;
    });
    return {...state,potentialResponses: ary, potentialResponseErrors:null,isPotentialResponseUpdated:true};
  case POTENTIAL_RESPONSE_DELETE:
    var potentialResponse = action.potentialResponses.data;
    var ary = state.potentialResponses.filter(function(v){
      if(v.id == potentialResponse.id){
        return false;
      }
      return true;
    });
    return {...state,potentialResponses: ary, potentialResponseErrors:null,isPotentialResponseUpdated:true};
  default:
    return  {...initialState, ...state, potentialResponseErrors:null,isPotentialResponseUpdated:false }
  }
}
