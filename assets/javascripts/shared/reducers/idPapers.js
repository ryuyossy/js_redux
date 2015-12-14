import request from 'superagent';
import { ID_PAPER_LIST, ID_PAPER_ERROR,ID_PAPER_CREATE,ID_PAPER_DELETE,ID_PAPER_UPDATE,ID_PAPER_DETAIL } from '../constants/ActionTypes';
const initialState = {idPapers:[], idPaperErrors: null, isIdPaperUpdated: false };
export default function idPapers(state = initialState, action) {

  switch (action.type) {
  case ID_PAPER_LIST:
    var idPapers =  action.idPapers.data;
    return {...state,idPapers: idPapers, idPaperErrors:null,isIdPaperUpdated:false};
  case ID_PAPER_ERROR:
    var errors = action.idPapers.errors;
    var idPaperErrors = null;
    var found = false;
    var ary = state.idPapers.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      idPaperErrors = errors;
    }
    return {...state,idPapers: ary,idPaperErrors: idPaperErrors,isIdPaperUpdated:false};
  case ID_PAPER_CREATE:
    var idPapers = action.idPapers.data;
    return {...state, idPapers: [...state.idPapers, idPapers], idPaperErrors:null,isIdPaperUpdated:true};
  case ID_PAPER_UPDATE:
    var idPapers = action.idPapers.data;
    var ary = state.idPapers.map(function(v){
      if(v.id == idPapers.id){
        return idPapers;
      }
      return v;
    });
    return {...state,idPapers: ary, idPaperErrors:null,isIdPaperUpdated:true};
  case ID_PAPER_DELETE:
    var idPaper = action.idPapers.data;
    var ary = state.idPapers.filter(function(v){
      if(v.id == idPaper.id){
        return false;
      }
      return true;
    });
    return {...state,idPapers: ary, idPaperErrors:null,isIdPaperUpdated:true};
  default:
    return  {...initialState, ...state, idPaperErrors:null,isIdPaperUpdated:false }
  }
}
