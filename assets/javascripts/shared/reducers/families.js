import request from 'superagent';
import { FAMILY_LIST, FAMILY_ERROR,FAMILY_CREATE,FAMILY_DELETE,FAMILY_UPDATE,FAMILY_DETAIL,FAMILY_CLEAR_DATA } from '../constants/ActionTypes';

const initialState = {families:[], familyErrors: null, isFamilyUpdated: false,isFamilyIdPictureUpdated:false, family: {}};
export default function families(state = initialState, action) {

  switch (action.type) {
  case FAMILY_CLEAR_DATA:
    return  {...initialState, ...state, familyErrors:null,isFamilyUpdated:false , isFamilyIdPictureUpdated:false}
  case FAMILY_LIST:
    var families =  action.families.data;
    return {...state,families: families, familyErrors:null,isFamilyUpdated:false, isFamilyIdPictureUpdated:false};
  case FAMILY_ERROR:
    var errors = action.families.errors;
    var familyErrors = null;
    var found = false;
    var ary = state.families.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });
    if(!found){
      familyErrors = errors;
    }

    return {...state,families: ary,familyErrors: familyErrors,isFamilyUpdated:false, isFamilyIdPictureUpdated:false};

  case FAMILY_CREATE:
    var families = action.families.data;
    return {...state, families: [...state.families, families], familyErrors:null,isFamilyUpdated:true, isFamilyIdPictureUpdated:false, family: families};
  case FAMILY_UPDATE:
    var families = action.families.data;
    var ary = state.families.map(function(v){
      if(v.id == families.id){
        return families;
      }
      return v;
    });
    return {...state,families: ary, familyErrors:null,isFamilyUpdated:true, isFamilyIdPictureUpdated:false};

  case FAMILY_DELETE:
    var family = action.families.data;
    var ary = state.families.filter(function(v){
      if(v.id == family.id){
        return false;
      }
      return true;
    });
    return {...state,families: ary, familyErrors:null,isFamilyUpdated:true, isFamilyIdPictureUpdated:false};
  case FAMILY_DETAIL:
      var family = action.family.data;
      return {...state ,family: family,familyErrors:null,isFamilyUpdated:false, isFamilyIdPictureUpdated:false};
  default:
    return  {...initialState, ...state, familyErrors:null,isFamilyUpdated:false, isFamilyIdPictureUpdated:false }
  }
}
