import request from 'superagent';
import { LOAN_USAGE_LIST, LOAN_USAGE_CREATE, LOAN_USAGE_DELETE, LOAN_USAGE_ERROR,LOAN_USAGE_UPDATE,LOAN_USAGE_DETAIL } from '../constants/ActionTypes';

  export function getLoanUsages() {
    return dispatch => {
        getLoanUsagesAsync().then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createLoanUsage(values){
    return dispatch => {
        createLoanUsageAsync(values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteLoanUsage(id){
      return dispatch => {
            deleteLoanUsageAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateLoanUsage(id,values){
      return dispatch => {
            updateLoanUsageAsync(id,values).then(result =>{
            return dispatch(result);
          });
      };
    }



    export function getLoanUsageDetail(id){
      return dispatch => {
          getLoanUsageDetailAsync(id).then(result =>{
            return dispatch(result);
          });
      };
    }



  async function getLoanUsagesAsync() {
    let response = await request
      .get(`/api/v1/settings/loanUsages`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: LOAN_USAGE_LIST,
      loanUsages: response.body,
    };
  }


  async function createLoanUsageAsync(values){
    let type = null;
    let response = await request
      .post(`/api/v1/settings/loanUsages`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = LOAN_USAGE_CREATE;
        return res;
      },function(err){
          type = LOAN_USAGE_ERROR;
          return err.response;
      });

      return {
        type: type,
        loanUsages: response.body,
      };

  }



  async function deleteLoanUsageAsync(id){
    let response = await request
      .del('/api/v1/settings/loanUsages/'+id)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: LOAN_USAGE_DELETE,
        loanUsages: response.body,
        id:id
      };

  }

  async function updateLoanUsageAsync(id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/settings/loanUsages/`+id)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = LOAN_USAGE_UPDATE;
        return res;
      },function(err){
        type = LOAN_USAGE_ERROR;
        return err.response;
      });

      return {
        type: type,
        loanUsages: response.body,
        id:id
      };

  }
