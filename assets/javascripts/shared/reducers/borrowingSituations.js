import request from 'superagent';
import { BORROWING_SITUATION_LIST, BORROWING_SITUATION_ERROR,BORROWING_SITUATION_CREATE,BORROWING_SITUATION_DELETE,BORROWING_SITUATION_UPDATE,BORROWING_SITUATION_DETAIL,BORROWING_SITUATION_CLEAR_DATA, BORROWING_SITUATION_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};

const initialState = {borrowingSituations:[], borrowingSituationErrors: null, isBorrowingSituationUpdated: false,isBorrowingSituationIdPictureUpdated:false, borrowingSituation: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function borrowingSituations(state = initialState, action) {

  switch (action.type) {
  case BORROWING_SITUATION_CLEAR_DATA:
    return  {...initialState, ...state, borrowingSituationErrors:null,isBorrowingSituationUpdated:false , isBorrowingSituationIdPictureUpdated:false}
  case BORROWING_SITUATION_LIST:
    var borrowingSituations =  action.borrowingSituations.data;
    return {...state,borrowingSituations: borrowingSituations, borrowingSituationErrors:null,isBorrowingSituationUpdated:false, isBorrowingSituationIdPictureUpdated:false};
  case BORROWING_SITUATION_ERROR:
    var errors = action.borrowingSituations.errors;
    var borrowingSituationErrors = null;
    var found = false;
    var ary = state.borrowingSituations.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });
    if(!found){
      borrowingSituationErrors = errors;
    }

    return {...state,borrowingSituations: ary,borrowingSituationErrors: borrowingSituationErrors,isBorrowingSituationUpdated:false, isBorrowingSituationIdPictureUpdated:false};

  case BORROWING_SITUATION_CREATE:
    var borrowingSituations = action.borrowingSituations.data;
    return {...state, borrowingSituations: [...state.borrowingSituations, borrowingSituations], borrowingSituationErrors:null,isBorrowingSituationUpdated:true, isBorrowingSituationIdPictureUpdated:false, borrowingSituation: borrowingSituations};
  case BORROWING_SITUATION_UPDATE:
    var borrowingSituations = action.borrowingSituations.data;
    var ary = state.borrowingSituations.map(function(v){
      if(v.id == borrowingSituations.id){
        return borrowingSituations;
      }
      return v;
    });
    return {...state,borrowingSituations: ary, borrowingSituationErrors:null,isBorrowingSituationUpdated:true, isBorrowingSituationIdPictureUpdated:false};

  case BORROWING_SITUATION_ID_PICTURE_UPLOAD:
    var borrowingSituations = action.borrowingSituations.data;
    var ary = state.borrowingSituations.map(function(v){
      if(v.id == borrowingSituations.id){
        return borrowingSituations;
      }
      return v;
    });
    return {...state,borrowingSituations: ary, borrowingSituationErrors:null,isBorrowingSituationUpdated:false, isBorrowingSituationIdPictureUpdated:true};

  case BORROWING_SITUATION_DELETE:
    var borrowingSituation = action.borrowingSituations.data;
    var ary = state.borrowingSituations.filter(function(v){
      if(v.id == borrowingSituation.id){
        return false;
      }
      return true;
    });
    return {...state,borrowingSituations: ary, borrowingSituationErrors:null,isBorrowingSituationUpdated:true, isBorrowingSituationIdPictureUpdated:false};
  case BORROWING_SITUATION_DETAIL:
      var borrowingSituation = action.borrowingSituation.data;
      return {...state ,borrowingSituation: borrowingSituation,borrowingSituationErrors:null,isBorrowingSituationUpdated:false, isBorrowingSituationIdPictureUpdated:false};
  default:
    return  {...initialState, ...state, borrowingSituationErrors:null,isBorrowingSituationUpdated:false, isBorrowingSituationIdPictureUpdated:false }
  }
}
