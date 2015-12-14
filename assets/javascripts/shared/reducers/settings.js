import request from 'superagent';
import { COMPANY_ERROR,COMPANY_LIST,COMPANY_UPDATE } from '../constants/ActionTypes';
const initialState = {company:{}, company_errors: null,is_company_updated: false, currency_list: [{text:"USD",payload:"1"},{text:"LKR",payload:"2"},{text:"MMK",payload:"3"},{text:"KHR", payload:"4"}], country_list:[{text:"Cambodia", payload:"1"},{text:"Myanmar", payload:"2"},{text:"Sri Lanka", payload:"3"}]};
export default function settings(state = initialState, action) {
  switch (action.type) {
  case COMPANY_LIST:
    var company =  action.company.data;
    return {...state,company: company,is_company_updated:false,company_errors:null};
  case COMPANY_ERROR:
    var company_errors = action.company.errors;
    return {...state,company_errors: company_errors,is_company_updated:false};
  case COMPANY_UPDATE:
    var company = action.company.data;
    return {...state,company: company,is_company_updated:true,company_errors:null};
  default:
    return  {...initialState, ...state,is_company_updated:false,company_errors:null };
  }
}
