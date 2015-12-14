import request from 'superagent';
import { LOAN_PRODUCT_LIST, LOAN_PRODUCT_ERROR,LOAN_PRODUCT_CREATE,LOAN_PRODUCT_DELETE,LOAN_PRODUCT_UPDATE,LOAN_PRODUCT_DETAIL,LOAN_PRODUCT_CLEAR_DATA } from '../constants/ActionTypes';

const clientTypes = {clientTypes: [{label: "Individual", value: "1"}, {label: "Group", value: "2"}]};
const installmentTypes = {installmentTypes: [{label: "monthly", value: "1"}, {label: "weekly", value: "2"}, {label: "balloon", value: "3"}, {label: "quarterly", value: "4"}, {label: "bi-weekly", value: "5"} ]};
const scheduleTypes = {scheduleTypes: [{label: "Equal Principal Interest System", value: "1"}, {label: "Flat Interest System", value: "2"}, {label: "Equal Payment System", value: "3"} ]};
const interestSchemes = {interestSchemes: [ {label: "actual/360", value: "1"}]};
const installmentTypesForMapping = {installmentTypesForMapping: {"1": "monthly", "2":"weekly","3":"baloon", "4":"quarterly","5":"bi-weekly"}};
const scheduleTypesForMapping = {scheduleTypesForMapping: {"1": "Equal Principal Interest System", "2":"Flat Interest System","3":"Flat Interest System" }};



const initialState = {loanProducts:[], loanProductErrors: null, isLoanProductUpdated: false,loanProduct: {}, ...clientTypes, ...installmentTypes, ...scheduleTypes, ...interestSchemes, ...installmentTypesForMapping, ...scheduleTypesForMapping};
export default function loanProducts(state = initialState, action) {

  switch (action.type) {
  case LOAN_PRODUCT_CLEAR_DATA:
    return  {...initialState, loanProductErrors:null,isLoanProductUpdated:false }
  case LOAN_PRODUCT_LIST:
    var loanProducts =  action.loanProducts.data;
    return {...state,loanProducts: loanProducts, loanProductErrors:null,isLoanProductUpdated:false};
  case LOAN_PRODUCT_ERROR:
    var errors = action.loanProducts.errors;
    var loanProductErrors = null;
    var found = false;
    var ary = state.loanProducts.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      loanProductErrors = errors;
    }

    return {...state,loanProducts: ary,loanProductErrors: loanProductErrors,isLoanProductUpdated:false};

  case LOAN_PRODUCT_CREATE:
    var loanProducts = action.loanProducts.data;
    return {...state, loanProducts: [...state.loanProducts, loanProducts], loanProductErrors:null,isLoanProductUpdated:true};
  case LOAN_PRODUCT_UPDATE:
    var loanProducts = action.loanProducts.data;
    var ary = state.loanProducts.map(function(v){
      if(v.id == loanProducts.id){
        return loanProducts;
      }
      return v;
    });
    return {...state,loanProducts: ary, loanProductErrors:null,isLoanProductUpdated:true};

  case LOAN_PRODUCT_DELETE:
    var loanProduct = action.loanProducts.data;
    var ary = state.loanProducts.filter(function(v){
      if(v.id == loanProduct.id){
        return false;
      }
      return true;
    });
    return {...state,loanProducts: ary, loanProductErrors:null,isLoanProductUpdated:true};
  case LOAN_PRODUCT_DETAIL:
      var loanProduct = action.loanProduct.data;
      return {...state ,loanProduct: loanProduct,loanProductErrors:null,isLoanProductUpdated:false};
  default:
    return  {...initialState, ...state, loanProductErrors:null,isLoanProductUpdated:false }
  }
}
