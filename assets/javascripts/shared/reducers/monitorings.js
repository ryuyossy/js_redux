import request from 'superagent';
import { MONITORING_LIST, MONITORING_ERROR,MONITORING_CREATE,MONITORING_DELETE,MONITORING_UPDATE,MONITORING_DETAIL } from '../constants/ActionTypes';
const answerTypes = {answerTypes: [{payload: "1", text:"String"},{payload: "2", text:"Number"}] };
const initialState = {monitorings:[], monitoringErrors: null, isMonitoringUpdated: false, ...answerTypes };
export default function monitorings(state = initialState, action) {

  switch (action.type) {
  case MONITORING_LIST:
    var monitorings =  action.monitorings.data;
    return {...state,monitorings: monitorings, monitoringErrors:null,isMonitoringUpdated:false};
  case MONITORING_ERROR:
    var errors = action.monitorings.errors;
    var monitoringErrors = null;
    var found = false;
    var ary = state.monitorings.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      monitoringErrors = errors;
    }
    return {...state,monitorings: ary,monitoringErrors: monitoringErrors,isMonitoringUpdated:false};
  case MONITORING_CREATE:
    var monitorings = action.monitorings.data;
    return {...state, monitorings: [...state.monitorings, monitorings], monitoringErrors:null,isMonitoringUpdated:true};
  case MONITORING_UPDATE:
    var monitorings = action.monitorings.data;
    var ary = state.monitorings.map(function(v){
      if(v.id == monitorings.id){
        return monitorings;
      }
      return v;
    });
    return {...state,monitorings: ary, monitoringErrors:null,isMonitoringUpdated:true};
  case MONITORING_DELETE:
    var monitoring = action.monitorings.data;
    var ary = state.monitorings.filter(function(v){
      if(v.id == monitoring.id){
        return false;
      }
      return true;
    });
    return {...state,monitorings: ary, monitoringErrors:null,isMonitoringUpdated:true};
  default:
    return  {...initialState, ...state, monitoringErrors:null,isMonitoringUpdated:false }
  }
}
