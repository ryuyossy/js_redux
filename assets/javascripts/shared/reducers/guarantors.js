import request from 'superagent';
import { GUARANTOR_LIST, GUARANTOR_ERROR,GUARANTOR_CREATE,GUARANTOR_DELETE,GUARANTOR_UPDATE,GUARANTOR_DETAIL,GUARANTOR_CLEAR_DATA, GUARANTOR_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

const paymentPlaces = {paymentPlaces: [{label: "Office", value: "1"}, {label: "House", value: "2"}]};
const loanPurposes = {loanPurposes: [{label: "Business", value: "1"}, {label: "Consumption", value: "2"}, {label: "Mix", value: "3"}]};

const paymentPlacesForMapping = {paymentPlacesForMapping: {"1": "Office", "2":"House"}};
const loanPurposesForMapping = {loanPurposesForMapping: {"1": "Business", "2":"Consumption", "3":"Mix"}};


const initialState = {guarantors:[], guarantorErrors: null, isGuarantorUpdated: false,isGuarantorIdPictureUpdated:false, guarantor: {}, ...paymentPlaces, ...loanPurposes, ...paymentPlacesForMapping, ...loanPurposesForMapping};
export default function guarantors(state = initialState, action) {

  switch (action.type) {
  case GUARANTOR_CLEAR_DATA:
    return  {...initialState, ...state, guarantorErrors:null,isGuarantorUpdated:false , isGuarantorIdPictureUpdated:false}
  case GUARANTOR_LIST:
    var guarantors =  action.guarantors.data;
    return {...state,guarantors: guarantors, guarantorErrors:null,isGuarantorUpdated:false, isGuarantorIdPictureUpdated:false};
  case GUARANTOR_ERROR:
    var errors = action.guarantors.errors;
    var guarantorErrors = null;
    var found = false;
    var ary = state.guarantors.map(function(v){
      if(v.id == action.id){
        found = true;
        return {errors:errors,...v};
      }
      return v;
    });

    if(!found){
      guarantorErrors = errors;
    }

    return {...state,guarantors: ary,guarantorErrors: guarantorErrors,isGuarantorUpdated:false, isGuarantorIdPictureUpdated:false};

  case GUARANTOR_CREATE:
    var guarantors = action.guarantors.data;
    return {...state, guarantors: [...state.guarantors, guarantors], guarantorErrors:null,isGuarantorUpdated:true, isGuarantorIdPictureUpdated:false, guarantor: guarantors};
  case GUARANTOR_UPDATE:
    var guarantors = action.guarantors.data;
    var ary = state.guarantors.map(function(v){
      if(v.id == guarantors.id){
        return guarantors;
      }
      return v;
    });
    return {...state,guarantors: ary, guarantorErrors:null,isGuarantorUpdated:true, isGuarantorIdPictureUpdated:false};

  case GUARANTOR_ID_PICTURE_UPLOAD:
    var guarantors = action.guarantors.data;
    var ary = state.guarantors.map(function(v){
      if(v.id == guarantors.id){
        return guarantors;
      }
      return v;
    });
    return {...state,guarantors: ary, guarantorErrors:null,isGuarantorUpdated:false, isGuarantorIdPictureUpdated:true};

  case GUARANTOR_DELETE:
    var guarantor = action.guarantors.data;
    var ary = state.guarantors.filter(function(v){
      if(v.id == guarantor.id){
        return false;
      }
      return true;
    });
    return {...state,guarantors: ary, guarantorErrors:null,isGuarantorUpdated:true, isGuarantorIdPictureUpdated:false};
  case GUARANTOR_DETAIL:
      var guarantor = action.guarantor.data;
      return {...state ,guarantor: guarantor,guarantorErrors:null,isGuarantorUpdated:false, isGuarantorIdPictureUpdated:false};
  default:
    return  {...initialState, ...state, guarantorErrors:null,isGuarantorUpdated:false, isGuarantorIdPictureUpdated:false }
  }
}
