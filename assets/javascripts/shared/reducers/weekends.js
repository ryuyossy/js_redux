import request from 'superagent';
import { WEEKEND_LIST, WEEKEND_ERROR,WEEKEND_CREATE,WEEKEND_DELETE,WEEKEND_UPDATE,WEEKEND_DETAIL,WEEKEND_CLEAR_DATA, WEEKEND_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';


const initialState = {weekends:[], weekendErrors: null, isWeekendUpdated: false,weekend: {}};
export default function weekends(state = initialState, action) {

  switch (action.type) {
  case WEEKEND_LIST:
    var weekends =  action.weekends.data;
    return {...state,weekends: weekends, weekendErrors:null,isWeekendUpdated:false};
  case WEEKEND_ERROR:
    var errors = action.weekends.errors;
    var weekendErrors = null;
    var found = false;
    var ary = state.weekends.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      weekendErrors = errors;
    }

    return {...state,weekends: ary,weekendErrors: weekendErrors,isWeekendUpdated:false};

  case WEEKEND_UPDATE:
    var weekend = action.weekends.data;
    return {...state,weekends: weekend, weekendErrors:null,isWeekendUpdated:true};
  default:
    return  {...initialState, ...state, weekendErrors:null,isWeekendUpdated:false }
  }
}
