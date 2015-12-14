import request from 'superagent';
import { LOAN_USAGE_LIST, LOAN_USAGE_ERROR,LOAN_USAGE_CREATE,LOAN_USAGE_DELETE,LOAN_USAGE_UPDATE,LOAN_USAGE_DETAIL } from '../constants/ActionTypes';
const initialState = {loanUsages:[], loanUsageErrors: null, isLoanUsageUpdated: false };
export default function loanUsages(state = initialState, action) {

  switch (action.type) {
  case LOAN_USAGE_LIST:
    var loanUsages =  action.loanUsages.data;
    return {...state,loanUsages: loanUsages, loanUsageErrors:null,isLoanUsageUpdated:false};
  case LOAN_USAGE_ERROR:
    var errors = action.loanUsages.errors;
    var loanUsageErrors = null;
    var found = false;
    var ary = state.loanUsages.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      loanUsageErrors = errors;
    }
    return {...state,loanUsages: ary,loanUsageErrors: loanUsageErrors,isLoanUsageUpdated:false};
  case LOAN_USAGE_CREATE:
    var loanUsages = action.loanUsages.data;
    return {...state, loanUsages: [...state.loanUsages, loanUsages], loanUsageErrors:null,isLoanUsageUpdated:true};
  case LOAN_USAGE_UPDATE:
    var loanUsages = action.loanUsages.data;
    var ary = state.loanUsages.map(function(v){
      if(v.id == loanUsages.id){
        return loanUsages;
      }
      return v;
    });
    return {...state,loanUsages: ary, loanUsageErrors:null,isLoanUsageUpdated:true};
  case LOAN_USAGE_DELETE:
    var loanUsage = action.loanUsages.data;
    var ary = state.loanUsages.filter(function(v){
      if(v.id == loanUsage.id){
        return false;
      }
      return true;
    });
    return {...state,loanUsages: ary, loanUsageErrors:null,isLoanUsageUpdated:true};
  default:
    return  {...initialState, ...state, loanUsageErrors:null,isLoanUsageUpdated:false }
  }
}
