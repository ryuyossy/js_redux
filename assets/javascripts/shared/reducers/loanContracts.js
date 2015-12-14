import request from 'superagent';
import { LOAN_CONTRACT_LIST, LOAN_CONTRACT_ERROR,LOAN_CONTRACT_CREATE,LOAN_CONTRACT_DELETE,LOAN_CONTRACT_UPDATE,LOAN_CONTRACT_DETAIL,LOAN_CONTRACT_CLEAR_DATA } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};


const initialState = {loanContracts:[], loanContractErrors: null, isLoanContractUpdated: false,loanContract: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function loanContracts(state = initialState, action) {

  switch (action.type) {
  case LOAN_CONTRACT_CLEAR_DATA:
    return  {...initialState, ...state, loanContractErrors:null,isLoanContractUpdated:false }
  case LOAN_CONTRACT_LIST:
    var loanContracts =  action.loanContracts.data;
    return {...state,loanContracts: loanContracts, loanContractErrors:null,isLoanContractUpdated:false};
  case LOAN_CONTRACT_ERROR:
    var errors = action.loanContracts.errors;
    var loanContractErrors = null;
    var found = false;
    var ary = state.loanContracts.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      loanContractErrors = errors;
    }

    return {...state,loanContracts: ary,loanContractErrors: loanContractErrors,isLoanContractUpdated:false};

  case LOAN_CONTRACT_CREATE:
    var loanContracts = action.loanContracts.data;
    return {...state, loanContracts: [...state.loanContracts, loanContracts], loanContractErrors:null,isLoanContractUpdated:true, loanContract:loanContracts};
  case LOAN_CONTRACT_UPDATE:
    var loanContracts = action.loanContracts.data;
    var ary = state.loanContracts.map(function(v){
      if(v.id == loanContracts.id){
        return loanContracts;
      }
      return v;
    });
    return {...state,loanContracts: ary, loanContractErrors:null,isLoanContractUpdated:true};

  case LOAN_CONTRACT_DELETE:
    var loanContract = action.loanContracts.data;
    var ary = state.loanContracts.filter(function(v){
      if(v.id == loanContract.id){
        return false;
      }
      return true;
    });
    return {...state,loanContracts: ary, loanContractErrors:null,isLoanContractUpdated:true};
  case LOAN_CONTRACT_DETAIL:
      var loanContract = action.loanContract.data;
      return {...state ,loanContract: loanContract,loanContractErrors:null,isLoanContractUpdated:false};
  default:
    return  {...initialState, ...state, loanContractErrors:null,isLoanContractUpdated:false }
  }
}
