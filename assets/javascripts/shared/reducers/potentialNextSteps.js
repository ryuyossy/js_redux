import request from 'superagent';
import { POTENTIAL_NEXT_STEP_LIST, POTENTIAL_NEXT_STEP_ERROR,POTENTIAL_NEXT_STEP_CREATE,POTENTIAL_NEXT_STEP_DELETE,POTENTIAL_NEXT_STEP_UPDATE,POTENTIAL_NEXT_STEP_DETAIL } from '../constants/ActionTypes';
const initialState = {potentialNextSteps:[], potentialnextStepErrors: null, isPotentialnextStepUpdated: false };
export default function potentialNextSteps(state = initialState, action) {
  switch (action.type) {
  case POTENTIAL_NEXT_STEP_LIST:
    var potentialNextSteps =  action.potentialNextSteps.data;
    return {...state,potentialNextSteps: potentialNextSteps, potentialnextStepErrors:null,isPotentialnextStepUpdated:false};
  case POTENTIAL_NEXT_STEP_ERROR:
    var errors = action.potentialNextSteps.errors;
    var potentialnextStepErrors = null;
    var found = false;
    var ary = state.potentialNextSteps.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      potentialnextStepErrors = errors;
    }
    return {...state,potentialNextSteps: ary,potentialnextStepErrors: potentialnextStepErrors,isPotentialnextStepUpdated:false};
  case POTENTIAL_NEXT_STEP_CREATE:
    var potentialNextSteps = action.potentialNextSteps.data;
    return {...state, potentialNextSteps: [...state.potentialNextSteps, potentialNextSteps], potentialnextStepErrors:null,isPotentialnextStepUpdated:true};
  case POTENTIAL_NEXT_STEP_UPDATE:
    var potentialNextSteps = action.potentialNextSteps.data;
    var ary = state.potentialNextSteps.map(function(v){
      if(v.id == potentialNextSteps.id){
        return potentialNextSteps;
      }
      return v;
    });
    return {...state,potentialNextSteps: ary, potentialnextStepErrors:null,isPotentialnextStepUpdated:true};
  case POTENTIAL_NEXT_STEP_DELETE:
    var potentialnextStep = action.potentialNextSteps.data;
    var ary = state.potentialNextSteps.filter(function(v){
      if(v.id == potentialnextStep.id){
        return false;
      }
      return true;
    });
    return {...state,potentialNextSteps: ary, potentialnextStepErrors:null,isPotentialnextStepUpdated:true};
  default:
    return  {...initialState, ...state, potentialnextStepErrors:null,isPotentialnextStepUpdated:false }
  }
}
