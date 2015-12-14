import request from 'superagent';
import { POTENTIAL_REASON_LIST, POTENTIAL_REASON_ERROR,POTENTIAL_REASON_CREATE,POTENTIAL_REASON_DELETE,POTENTIAL_REASON_UPDATE,POTENTIAL_REASON_DETAIL } from '../constants/ActionTypes';
const initialState = {potentialReasons:[], potentialReasonErrors: null, isPotentialReasonUpdated: false };
export default function potentialReasons(state = initialState, action) {

  switch (action.type) {
  case POTENTIAL_REASON_LIST:
    var potentialReasons =  action.potentialReasons.data;
    return {...state,potentialReasons: potentialReasons, potentialReasonErrors:null,isPotentialReasonUpdated:false};
  case POTENTIAL_REASON_ERROR:
    var errors = action.potentialReasons.errors;
    var potentialReasonErrors = null;
    var found = false;
    var ary = state.potentialReasons.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      potentialReasonErrors = errors;
    }
    return {...state,potentialReasons: ary,potentialReasonErrors: potentialReasonErrors,isPotentialReasonUpdated:false};
  case POTENTIAL_REASON_CREATE:
    var potentialReasons = action.potentialReasons.data;
    return {...state, potentialReasons: [...state.potentialReasons, potentialReasons], potentialReasonErrors:null,isPotentialReasonUpdated:true};
  case POTENTIAL_REASON_UPDATE:
    var potentialReasons = action.potentialReasons.data;
    var ary = state.potentialReasons.map(function(v){
      if(v.id == potentialReasons.id){
        return potentialReasons;
      }
      return v;
    });
    return {...state,potentialReasons: ary, potentialReasonErrors:null,isPotentialReasonUpdated:true};
  case POTENTIAL_REASON_DELETE:
    var potentialReason = action.potentialReasons.data;
    var ary = state.potentialReasons.filter(function(v){
      if(v.id == potentialReason.id){
        return false;
      }
      return true;
    });
    return {...state,potentialReasons: ary, potentialReasonErrors:null,isPotentialReasonUpdated:true};
  default:
    return  {...initialState, ...state, potentialReasonErrors:null,isPotentialReasonUpdated:false }
  }
}
