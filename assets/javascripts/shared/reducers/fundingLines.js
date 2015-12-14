import request from 'superagent';
import { FUNDING_LINE_LIST, FUNDING_LINE_ERROR,FUNDING_LINE_CREATE,FUNDING_LINE_DELETE,FUNDING_LINE_UPDATE,FUNDING_LINE_DETAIL } from '../constants/ActionTypes';
const initialState = {fundingLines:[], fundingLineErrors: null, isFundingLineUpdated: false };
export default function fundingLines(state = initialState, action) {

  switch (action.type) {
  case FUNDING_LINE_LIST:
    var fundingLines =  action.fundingLines.data;
    return {...state,fundingLines: fundingLines, fundingLineErrors:null,isFundingLineUpdated:false};
  case FUNDING_LINE_ERROR:
    var errors = action.fundingLines.errors;
    var fundingLineErrors = null;
    var found = false;
    var ary = state.fundingLines.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      fundingLineErrors = errors;
    }
    return {...state,fundingLines: ary,fundingLineErrors: fundingLineErrors,isFundingLineUpdated:false};
  case FUNDING_LINE_CREATE:
    var fundingLines = action.fundingLines.data;
    return {...state, fundingLines: [...state.fundingLines, fundingLines], fundingLineErrors:null,isFundingLineUpdated:true};
  case FUNDING_LINE_UPDATE:
    var fundingLines = action.fundingLines.data;
    var ary = state.fundingLines.map(function(v){
      if(v.id == fundingLines.id){
        return fundingLines;
      }
      return v;
    });
    return {...state,fundingLines: ary, fundingLineErrors:null,isFundingLineUpdated:true};
  case FUNDING_LINE_DELETE:
    var fundingLine = action.fundingLines.data;
    var ary = state.fundingLines.filter(function(v){
      if(v.id == fundingLine.id){
        return false;
      }
      return true;
    });
    return {...state,fundingLines: ary, fundingLineErrors:null,isFundingLineUpdated:true};
  default:
    return  {...initialState, ...state, fundingLineErrors:null,isFundingLineUpdated:false }
  }
}
