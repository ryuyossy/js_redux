import request from 'superagent';
import { COLLATERAL_TYPE_LIST, COLLATERAL_TYPE_ERROR,COLLATERAL_TYPE_CREATE,COLLATERAL_TYPE_DELETE,COLLATERAL_TYPE_UPDATE,COLLATERAL_TYPE_DETAIL } from '../constants/ActionTypes';

const dataTypes = {dataTypes: [{payload: "1", text:"String"},{payload: "2", text:"Number"},{payload: "3", text:"Date"}] };
const initialState = {collateralTypes:[], collateralTypeErrors: null, isCollateralTypeUpdated: false,collateralType: {}, ...dataTypes};
export default function collateralTypes(state = initialState, action) {

  switch (action.type) {
  case COLLATERAL_TYPE_LIST:
    var collateralTypes =  action.collateralTypes.data;
    return {...state,collateralTypes: collateralTypes, collateralTypeErrors:null,isCollateralTypeUpdated:false};
  case COLLATERAL_TYPE_ERROR:
    var errors = action.collateralTypes.errors;
    var collateralTypeErrors = null;
    var found = false;
    var ary = state.collateralTypes.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      collateralTypeErrors = errors;
    }

    return {...state,collateralTypes: ary,collateralTypeErrors: collateralTypeErrors,isCollateralTypeUpdated:false};

  case COLLATERAL_TYPE_CREATE:
    var collateralTypes = action.collateralTypes.data;
    return {...state, collateralTypes: [...state.collateralTypes, collateralTypes], collateralTypeErrors:null,isCollateralTypeUpdated:true};
  case COLLATERAL_TYPE_UPDATE:
    var collateralTypes = action.collateralTypes.data;
    var ary = state.collateralTypes.map(function(v){
      if(v.id == collateralTypes.id){
        return collateralTypes;
      }
      return v;
    });
    return {...state,collateralTypes: ary, collateralTypeErrors:null,isCollateralTypeUpdated:true};

  case COLLATERAL_TYPE_DELETE:
    var collateralType = action.collateralTypes.data;
    var ary = state.collateralTypes.filter(function(v){
      if(v.id == collateralType.id){
        return false;
      }
      return true;
    });
    return {...state,collateralTypes: ary, collateralTypeErrors:null,isCollateralTypeUpdated:true};
  case COLLATERAL_TYPE_DETAIL:
      var collateralType = action.collateralType.data;
      return {...state ,collateralType: collateralType,collateralTypeErrors:null,isCollateralTypeUpdated:false};
  default:
    return  {...initialState, ...state, collateralTypeErrors:null,isCollateralTypeUpdated:false }
  }
}
