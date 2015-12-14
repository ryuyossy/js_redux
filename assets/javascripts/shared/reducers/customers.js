import request from 'superagent';
import { CUSTOMER_LIST, CUSTOMER_ERROR,CUSTOMER_CREATE,CUSTOMER_DELETE,CUSTOMER_UPDATE,CUSTOMER_DETAIL,CUSTOMER_CLEAR_DATA, CUSTOMER_ID_PICTURE_UPLOAD, POTENTIAL_CUSTOMER_LIST, POTENTIAL_CUSTOMER_ERROR,POTENTIAL_CUSTOMER_CREATE,POTENTIAL_CUSTOMER_DELETE,POTENTIAL_CUSTOMER_UPDATE,POTENTIAL_CUSTOMER_DETAIL,POTENTIAL_CUSTOMER_CLEAR_DATA, POTENTIAL_CUSTOMER_ID_PICTURE_UPLOAD,CUSTOMER_SEARCH,POTENTIAL_CUSTOMER_SEARCH,POTENTIAL_CUSTOMER_UPGRADE } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};


const initialState = {potentialCustomers:[], customers:[] ,potentialCustomerErrors:[], customerErrors: null, isCustomerUpdated: false, isPotentialCustomerUpgraded: false, isPotentialCustomerUpdated: false,isCustomerIdPictureUpdated:false, isPotentialCustomerIdPictureUpdated:false, customer: {},potentialCustomer: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function customers(state = initialState, action) {
  switch (action.type) {
  case CUSTOMER_CLEAR_DATA:
    return  {...initialState, ...state, customerErrors:null,isCustomerUpdated:false , isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false}
  case CUSTOMER_LIST:
    var customers =  action.customers.data;
    return {...state,customers: customers, customerErrors:null,isCustomerUpdated:false, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case CUSTOMER_ERROR:
    var errors = action.customers.errors;
    var customerErrors = null;
    var found = false;
    var ary = state.customers.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      customerErrors = errors;
    }

    return {...state,customers: ary,customerErrors: customerErrors,isCustomerUpdated:false, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};

  case CUSTOMER_CREATE:
    var customers = action.customers.data;
    return {...state, customers: [...state.customers, customers], customerErrors:null,isCustomerUpdated:true, isCustomerIdPictureUpdated:false, customer: customers, isPotentialCustomerUpgraded:false};
  case CUSTOMER_UPDATE:
    var customers = action.customers.data;
    var ary = state.customers.map(function(v){
      if(v.id == customers.id){
        return customers;
      }
      return v;
    });
    return {...state,customers: ary, customerErrors:null,isCustomerUpdated:true, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};

  case CUSTOMER_ID_PICTURE_UPLOAD:
    var customers = action.customers.data;
    var ary = state.customers.map(function(v){
      if(v.id == customers.id){
        return customers;
      }
      return v;
    });
    return {...state,customers: ary, customerErrors:null,isCustomerUpdated:false, isCustomerIdPictureUpdated:true, isPotentialCustomerUpgraded:false};

  case CUSTOMER_DELETE:
    var customer = action.customers.data;
    var ary = state.customers.filter(function(v){
      if(v.id == customer.id){
        return false;
      }
      return true;
    });
    return {...state,customers: ary, customerErrors:null,isCustomerUpdated:true, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case CUSTOMER_DETAIL:
      var customer = action.customers.data;
      return {...state ,customer: customer,customerErrors:null,isCustomerUpdated:false, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case CUSTOMER_SEARCH:
    var customers =  action.customers.data;
    return {...state,customers: customers, customerErrors:null,isCustomerUpdated:false, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case POTENTIAL_CUSTOMER_SEARCH:
    var potentialCustomers =  action.potentialCustomers.data;
    return {...state,potentialCustomers: potentialCustomers, potentialCustomerErrors:null,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case POTENTIAL_CUSTOMER_CLEAR_DATA:
    return  {...initialState, ...state, potentialCustomerErrors:null,isPotentialCustomerUpdated:false , isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false}
  case POTENTIAL_CUSTOMER_LIST:
    var potentialCustomers =  action.potentialCustomers.data;
    return {...state,potentialCustomers: potentialCustomers, potentialCustomerErrors:null,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case POTENTIAL_CUSTOMER_ERROR:
    var errors = action.potentialCustomers.errors;
    var potentialCustomerErrors = null;
    var found = false;
    var ary = state.potentialCustomers.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      potentialCustomerErrors = errors;
    }

    return {...state,potentialCustomers: ary,potentialCustomerErrors: potentialCustomerErrors,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};

  case POTENTIAL_CUSTOMER_CREATE:
    var potentialCustomers = action.potentialCustomers.data;
    return {...state, potentialCustomers: [state.potentialCustomers, potentialCustomers], potentialCustomerErrors:null,isPotentialCustomerUpdated:true, isPotentialCustomerIdPictureUpdated:false, potentialCustomer: potentialCustomers, isPotentialCustomerUpgraded:false};
  case POTENTIAL_CUSTOMER_UPDATE:
    var potentialCustomers = action.potentialCustomers.data;
    var ary = state.potentialCustomers.map(function(v){
      if(v.id == potentialCustomers.id){
        return potentialCustomers;
      }
      return v;
    });
    return {...state,potentialCustomers: ary, potentialCustomerErrors:null,isPotentialCustomerUpdated:true, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};

  case POTENTIAL_CUSTOMER_UPGRADE:
    var potentialCustomers = action.potentialCustomers.data;
    var ary = state.potentialCustomers.map(function(v){
      if(v.id == potentialCustomers.id){
        return potentialCustomers;
      }
      return v;
    });
    return {...state,potentialCustomers: ary, potentialCustomerErrors:null,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:true};


  case POTENTIAL_CUSTOMER_ID_PICTURE_UPLOAD:
    var potentialCustomers = action.potentialCustomers.data;
    var ary = state.potentialCustomers.map(function(v){
      if(v.id == potentialCustomers.id){
        return potentialCustomers;
      }
      return v;
    });
    return {...state,potentialCustomers: ary, potentialCustomerErrors:null,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:true, isPotentialCustomerUpgraded:false};

  case POTENTIAL_CUSTOMER_DELETE:
    var potentialCustomer = action.potentialCustomers.data;
    var ary = state.potentialCustomers.filter(function(v){
      if(v.id == potentialCustomer.id){
        return false;
      }
      return true;
    });
    return {...state,potentialCustomers: ary, potentialCustomerErrors:null,isPotentialCustomerUpdated:true, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};
  case POTENTIAL_CUSTOMER_DETAIL:
      var potentialCustomer = action.potentialCustomer.data;
      return {...state ,potentialCustomer: potentialCustomer,potentialCustomerErrors:null,isPotentialCustomerUpdated:false, isPotentialCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false};


  default:
    return  {...initialState, ...state, customerErrors:null, potentialCustomerErrors:null, isCustomerUpdated:false, isPotentialCustomerUpdated:false, isCustomerIdPictureUpdated:false, isPotentialCustomerUpgraded:false }
  }
}
