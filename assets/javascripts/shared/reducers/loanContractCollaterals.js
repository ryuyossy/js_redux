import request from 'superagent';
import { LOAN_CONTRACT_COLLATERAL_LIST, LOAN_CONTRACT_COLLATERAL_ERROR,LOAN_CONTRACT_COLLATERAL_CREATE,LOAN_CONTRACT_COLLATERAL_DELETE,LOAN_CONTRACT_COLLATERAL_UPDATE,LOAN_CONTRACT_COLLATERAL_DETAIL,LOAN_CONTRACT_COLLATERAL_CLEAR_DATA, LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};


const initialState = {loanContractCollaterals:[], loanContractCollateralErrors: null, isLoanContractCollateralUpdated: false,isLoanContractCollateralIdPictureUpdated:false, loanContractCollateral: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function loanContractCollaterals(state = initialState, action) {

  switch (action.type) {
  case LOAN_CONTRACT_COLLATERAL_CLEAR_DATA:
    return  {...initialState, ...state, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:false , isLoanContractCollateralIdPictureUpdated:false}
  case LOAN_CONTRACT_COLLATERAL_LIST:
    var loanContractCollaterals =  action.loanContractCollaterals.data;
    return {...state,loanContractCollaterals: loanContractCollaterals, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:false, isLoanContractCollateralIdPictureUpdated:false};
  case LOAN_CONTRACT_COLLATERAL_ERROR:
    var errors = action.loanContractCollaterals.errors;
    var loanContractCollateralErrors = null;
    var found = false;
    var ary = state.loanContractCollaterals.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      loanContractCollateralErrors = errors;
    }

    return {...state,loanContractCollaterals: ary,loanContractCollateralErrors: loanContractCollateralErrors,isLoanContractCollateralUpdated:false, isLoanContractCollateralIdPictureUpdated:false};

  case LOAN_CONTRACT_COLLATERAL_CREATE:
    var loanContractCollaterals = action.loanContractCollaterals.data;
    return {...state, loanContractCollaterals: [...state.loanContractCollaterals, loanContractCollaterals], loanContractCollateralErrors:null,isLoanContractCollateralUpdated:true, isLoanContractCollateralIdPictureUpdated:false};
  case LOAN_CONTRACT_COLLATERAL_UPDATE:
    var loanContractCollaterals = action.loanContractCollaterals.data;
    var ary = state.loanContractCollaterals.map(function(v){
      if(v.id == loanContractCollaterals.id){
        return loanContractCollaterals;
      }
      return v;
    });
    return {...state,loanContractCollaterals: ary, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:true, isLoanContractCollateralIdPictureUpdated:false};

  case LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD:
    var loanContractCollaterals = action.loanContractCollaterals.data;
    var ary = state.loanContractCollaterals.map(function(v){
      if(v.id == loanContractCollaterals.id){
        return loanContractCollaterals;
      }
      return v;
    });
    return {...state,loanContractCollaterals: ary, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:false, isLoanContractCollateralIdPictureUpdated:true};

  case LOAN_CONTRACT_COLLATERAL_DELETE:
    var loanContractCollateral = action.loanContractCollaterals.data;
    var ary = state.loanContractCollaterals.filter(function(v){
      if(v.id == loanContractCollateral.id){
        return false;
      }
      return true;
    });
    return {...state,loanContractCollaterals: ary, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:true, isLoanContractCollateralIdPictureUpdated:false};
  case LOAN_CONTRACT_COLLATERAL_DETAIL:
      var loanContractCollateral = action.loanContractCollateral.data;
      return {...state ,loanContractCollateral: loanContractCollateral,loanContractCollateralErrors:null,isLoanContractCollateralUpdated:false, isLoanContractCollateralIdPictureUpdated:false};
  default:
    return  {...initialState, ...state, loanContractCollateralErrors:null,isLoanContractCollateralUpdated:false, isLoanContractCollateralIdPictureUpdated:false }
  }
}
