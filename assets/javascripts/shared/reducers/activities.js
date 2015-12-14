import request from 'superagent';
import { ACTIVITY_LIST, ACTIVITY_ERROR,ACTIVITY_CREATE,ACTIVITY_DELETE,ACTIVITY_UPDATE,ACTIVITY_DETAIL,ACTIVITY_CLEAR_DATA, ACTIVITY_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};

const initialState = {Activities:[], activityErrors: null, isActivityUpdated: false,isActivityIdPictureUpdated:false, activity: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function activities(state = initialState, action) {
  switch (action.type) {
  case ACTIVITY_CLEAR_DATA:
    return  {...initialState, ...state, activityErrors:null,isActivityUpdated:false , isActivityIdPictureUpdated:false}
  case ACTIVITY_LIST:
    var activities =  action.activities.data;
    return {...state,activities: activities, activityErrors:null,isActivityUpdated:false, isActivityIdPictureUpdated:false};
  case ACTIVITY_ERROR:
    var errors = action.activities.errors;
    var activityErrors = null;
    var found = false;
    var ary = state.activities.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });
    if(!found){
      activityErrors = errors;
    }

    return {...state,activities: ary,activityErrors: activityErrors,isActivityUpdated:false, isActivityIdPictureUpdated:false};

  case ACTIVITY_CREATE:
    var activities = action.activities.data;
    return {...state, activities: activities, activityErrors:null,isActivityUpdated:true, isActivityIdPictureUpdated:false, activity: activities};
  case ACTIVITY_UPDATE:
    var activities = action.activities.data;
    var ary = state.activities.map(function(v){
      if(v.id == activities.id){
        return activities;
      }
      return v;
    });
    return {...state,activities: ary, activityErrors:null,isActivityUpdated:true, isActivityIdPictureUpdated:false};

  case ACTIVITY_ID_PICTURE_UPLOAD:
    var activities = action.activities.data;
    var ary = state.activities.map(function(v){
      if(v.id == activities.id){
        return activities;
      }
      return v;
    });
    return {...state,activities: ary, activityErrors:null,isActivityUpdated:false, isActivityIdPictureUpdated:true};

  case ACTIVITY_DELETE:
    var activity = action.activities.data;
    var ary = state.activities.filter(function(v){
      if(v.id == activity.id){
        return false;
      }
      return true;
    });
    return {...state,activities: ary, activityErrors:null,isActivityUpdated:true, isActivityIdPictureUpdated:false};
  case ACTIVITY_DETAIL:
      var activity = action.activity.data;
      return {...state ,activity: activity,activityErrors:null,isActivityUpdated:false, isActivityIdPictureUpdated:false};
  default:
    return  {...initialState, ...state, activityErrors:null,isActivityUpdated:false, isActivityIdPictureUpdated:false }
  }
}
