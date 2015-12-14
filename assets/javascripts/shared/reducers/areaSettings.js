import request from 'superagent';
import { AREA_SETTINGS_ERROR,AREA_SETTINGS_LIST,AREA_SETTINGS_COUNT,AREA_SETTINGS_UPLOAD } from '../constants/ActionTypes';
const initialState = {area_settings:[]};
export default function areaSettings(state = initialState, action) {
  switch (action.type) {
  case AREA_SETTINGS_LIST:
    var area_settings =  action.area_settings.data;
    return {...state,area_settings: area_settings};
  case AREA_SETTINGS_COUNT:
    var count =  action.area_settings.data;
    return {...state,count: count};
  case AREA_SETTINGS_ERROR:
    var errors = action.area_settings.errors;
    var ary = state.area_settings.map(function(v){
      if(v.id == action.id){
        return {errors:errors,...v};
      }
      return v;
    });
    return {...state,area_settings: ary};

  case AREA_SETTINGS_UPLOAD:
    var area_settings =  action.area_settings.data;
    return {...state,count: area_settings};
  default:
    return  {...initialState, ...state }
  }
}
