import request from 'superagent';
import { GROUP_LIST, GROUP_ERROR,GROUP_CREATE,GROUP_DELETE,GROUP_UPDATE,GROUP_DETAIL,GROUP_CLEAR_DATA,GROUP_SEARCH, GROUP_MEMBER_ADDED, GROUP_MEMBER_DELETED } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};


const initialState = { groups:[] , groupErrors: null, isGroupUpdated: false,isGroupIdPictureUpdated:false, group: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function groups(state = initialState, action) {
  switch (action.type) {
  case GROUP_CLEAR_DATA:
    return  {...initialState, ...state, groupErrors:null,isGroupUpdated:false , isGroupIdPictureUpdated:false}
  case GROUP_LIST:
    var groups =  action.groups.data;
    return {...state,groups: groups, groupErrors:null,isGroupUpdated:false, isGroupIdPictureUpdated:false};
  case GROUP_ERROR:
    var errors = action.groups.errors;
    var groupErrors = null;
    var found = false;
    var ary = state.groups.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      groupErrors = errors;
    }

    return {...state,groups: ary,groupErrors: groupErrors,isGroupUpdated:false, isGroupIdPictureUpdated:false};

  case GROUP_CREATE:
    var groups = action.groups.data;
    return {...state, groups: [...state.groups, groups], groupErrors:null,isGroupUpdated:true, isGroupIdPictureUpdated:false, group: groups};
  case GROUP_UPDATE:
    var groups = action.groups.data;
    var ary = state.groups.map(function(v){
      if(v.id == groups.id){
        return groups;
      }
      return v;
    });
    return {...state,groups: ary, groupErrors:null,isGroupUpdated:true, isGroupIdPictureUpdated:false};

  case GROUP_DELETE:
    var group = action.groups.data;
    var ary = state.groups.filter(function(v){
      if(v.id == group.id){
        return false;
      }
      return true;
    });
    return {...state,groups: ary, groupErrors:null,isGroupUpdated:true, isGroupIdPictureUpdated:false};
  case GROUP_DETAIL:
      var group = action.groups.data;
      return {...state ,group: group,groupErrors:null,isGroupUpdated:false, isGroupIdPictureUpdated:false};
  case GROUP_MEMBER_ADDED:
      var group = action.groups.data;
      return {...state ,group: group,groupErrors:null,isGroupUpdated:false, isGroupIdPictureUpdated:false};
  case GROUP_MEMBER_DELETED:
      var group = action.groups.data;
      return {...state ,group: group,groupErrors:null,isGroupUpdated:false, isGroupIdPictureUpdated:false};
  case GROUP_SEARCH:
    var groups =  action.groups.data;
    return {...state,groups: groups, groupErrors:null,isGroupUpdated:false, isGroupIdPictureUpdated:false};

  default:
    return  {...initialState, ...state, groupErrors:null, isGroupUpdated:false,  isGroupIdPictureUpdated:false }
  }
}
