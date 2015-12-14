import request from 'superagent';
import { REPAYMENT_SCHEDULE_LIST, REPAYMENT_SCHEDULE_CLEAR_DATA,REPAYMENT_SCHEDULE_ERROR,REPAYMENT_SCHEDULE_UPDATE } from '../constants/ActionTypes';


const initialState = {repaymentSchedules:[], repaymentScheduleErrors: null, isRepaymentScheduleUpdated: false,repaymentSchedule: {}};
export default function repaymentSchedules(state = initialState, action) {

  switch (action.type) {
  case REPAYMENT_SCHEDULE_CLEAR_DATA:
    return  {...initialState, ...state, repaymentScheduleErrors:null,isRepaymentScheduleUpdated:false }
  case REPAYMENT_SCHEDULE_LIST:
    var repaymentSchedules =  action.repaymentSchedules.data;
    return {...state,repaymentSchedules: repaymentSchedules, repaymentScheduleErrors:null,isRepaymentScheduleUpdated:false};
  case REPAYMENT_SCHEDULE_ERROR:
    var errors = action.repaymentSchedules.errors;
    var repaymentScheduleErrors = null;
    var found = false;
    var ary = state.repaymentSchedules.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      repaymentScheduleErrors = errors;
    }
    return {...state,repaymentSchedules: ary,repaymentScheduleErrors: repaymentScheduleErrors,isRepaymentScheduleUpdated:false};

  case REPAYMENT_SCHEDULE_UPDATE:
    // var repaymentSchedules = action.repaymentSchedules.data;
    // var ary = state.repaymentSchedules.map(function(v){
    //   if(v.id == repaymentSchedules.id){
    //     return repaymentSchedules;
    //   }
    //   return v;
    // });
    // return {...state,repaymentSchedules: ary, repaymentScheduleErrors:null,isrepaymentScheduleUpdated:true};

    var repaymentSchedules =  action.repaymentSchedules.data;
    return {...state,repaymentSchedules: repaymentSchedules, repaymentScheduleErrors:null,isRepaymentScheduleUpdated:false};

  default:
    return  {...initialState, ...state, repaymentScheduleErrors:null,isRepaymentScheduleUpdated:false }
  }
}
