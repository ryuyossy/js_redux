import request from 'superagent';
import { HOLIDAY_LIST, HOLIDAY_ERROR,HOLIDAY_CREATE,HOLIDAY_DELETE,HOLIDAY_UPDATE,HOLIDAY_DETAIL } from '../constants/ActionTypes';
const initialState = {holidays:[], holiday_errors: null, is_holiday_updated: false };
export default function holidays(state = initialState, action) {

  switch (action.type) {
  case HOLIDAY_LIST:
    var holidays =  action.holidays.data;
    return {...state,holidays: holidays, holiday_errors:null,is_holiday_updated:false};
  case HOLIDAY_ERROR:
    var errors = action.holidays.errors;
    var holiday_errors = null;
    var found = false;
    var ary = state.holidays.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      holiday_errors = errors;
    }

    return {...state,holidays: ary,holiday_errors: holiday_errors,is_holiday_updated:false};

  case HOLIDAY_CREATE:
    var holidays = action.holidays.data;
    return {...state, holidays: [...state.holidays, holidays], holiday_errors:null,is_holiday_updated:true};
  case HOLIDAY_UPDATE:
    var holidays = action.holidays.data;
    var ary = state.holidays.map(function(v){
      if(v.id == holidays.id){
        return holidays;
      }
      return v;
    });
    return {...state,holidays: ary, holiday_errors:null,is_holiday_updated:true};

  case HOLIDAY_DELETE:
    var holiday = action.holidays.data;
    var ary = state.holidays.filter(function(v){
      if(v.id == holiday.id){
        return false;
      }
      return true;
    });
    return {...state,holidays: ary, holiday_errors:null,is_holiday_updated:true};
  default:
    return  {...initialState, ...state, holiday_errors:null,is_holiday_updated:false }
  }
}
