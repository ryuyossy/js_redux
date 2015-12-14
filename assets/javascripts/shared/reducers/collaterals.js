import request from 'superagent';
import { COLLATERAL_LIST, COLLATERAL_ERROR,COLLATERAL_CREATE,COLLATERAL_DELETE,COLLATERAL_UPDATE,COLLATERAL_DETAIL,COLLATERAL_CLEAR_DATA } from '../constants/ActionTypes';

const initialState = {collaterals:[], collateralErrors: null, isCollateralUpdated: false,collateral: {}};
export default function collaterals(state = initialState, action) {

  switch (action.type) {
  case COLLATERAL_CLEAR_DATA:
    return  {...initialState, collateralErrors:null,isCollateralUpdated:false }
  case COLLATERAL_LIST:
    var collaterals =  action.collaterals.data;
    return {...state,collaterals: collaterals, collateralErrors:null,isCollateralUpdated:false};
  case COLLATERAL_ERROR:
    var errors = action.collaterals.errors;
    var collateralErrors = null;
    var found = false;
    var ary = state.collaterals.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      collateralErrors = errors;
    }

    return {...state,collaterals: ary,collateralErrors: collateralErrors,isCollateralUpdated:false};

  case COLLATERAL_CREATE:
    var collaterals = action.collaterals.data;
    return {...state, collaterals: [...state.collaterals, collaterals], collateralErrors:null,isCollateralUpdated:true};
  case COLLATERAL_UPDATE:
    var collaterals = action.collaterals.data;
    var ary = state.collaterals.map(function(v){
      if(v.id == collaterals.id){
        return collaterals;
      }
      return v;
    });
    return {...state,collaterals: ary, collateralErrors:null,isCollateralUpdated:true};

  case COLLATERAL_DELETE:
    var collateral = action.collaterals.data;
    var ary = state.collaterals.filter(function(v){
      if(v.id == collateral.id){
        return false;
      }
      return true;
    });
    return {...state,collaterals: ary, collateralErrors:null,isCollateralUpdated:true};
  case COLLATERAL_DETAIL:
      var collateral = action.collateral.data;
      return {...state ,collateral: collateral,collateralErrors:null,isCollateralUpdated:false};
  default:
    return  {...initialState, ...state, collateralErrors:null,isCollateralUpdated:false }
  }
}
