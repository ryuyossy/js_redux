import request from 'superagent';
import { ECONOMIC_ACTIVITY_LIST, ECONOMIC_ACTIVITY_ERROR,ECONOMIC_ACTIVITY_CREATE,ECONOMIC_ACTIVITY_DELETE,ECONOMIC_ACTIVITY_UPDATE,ECONOMIC_ACTIVITY_DETAIL } from '../constants/ActionTypes';
const initialState = {economicActivities:[], economicActivityErrors: null, isFundingLineUpdated: false };
export default function economicActivities(state = initialState, action) {

  switch (action.type) {
  case ECONOMIC_ACTIVITY_LIST:
    var economicActivities =  action.economicActivities.data;
    return {...state,economicActivities: economicActivities, economicActivityErrors:null,isFundingLineUpdated:false};
  case ECONOMIC_ACTIVITY_ERROR:
    var errors = action.economicActivities.errors;
    var economicActivityErrors = null;
    var found = false;
    var ary = state.economicActivities.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      economicActivityErrors = errors;
    }
    return {...state,economicActivities: ary,economicActivityErrors: economicActivityErrors,isFundingLineUpdated:false};
  case ECONOMIC_ACTIVITY_CREATE:
    var economicActivities = action.economicActivities.data;
    return {...state, economicActivities: [...state.economicActivities, economicActivities], economicActivityErrors:null,isFundingLineUpdated:true};
  case ECONOMIC_ACTIVITY_UPDATE:
    var economicActivities = action.economicActivities.data;
    var ary = state.economicActivities.map(function(v){
      if(v.id == economicActivities.id){
        return economicActivities;
      }
      return v;
    });
    return {...state,economicActivities: ary, economicActivityErrors:null,isFundingLineUpdated:true};
  case ECONOMIC_ACTIVITY_DELETE:
    var economicActivity = action.economicActivities.data;
    var ary = state.economicActivities.filter(function(v){
      if(v.id == economicActivity.id){
        return false;
      }
      return true;
    });
    return {...state,economicActivities: ary, economicActivityErrors:null,isFundingLineUpdated:true};
  default:
    return  {...initialState, ...state, economicActivityErrors:null,isFundingLineUpdated:false }
  }
}
