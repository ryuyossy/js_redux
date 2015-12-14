import request from 'superagent';
import { REPAYMENT_LIST, REPAYMENT_CREATE, REPAYMENT_DELETE, REPAYMENT_ERROR,REPAYMENT_UPDATE,REPAYMENT_DETAIL,REPAYMENT_CLEAR } from '../constants/ActionTypes';

  export function getRepayments(customerId,loanContractId) {
    return dispatch => {
        getRepaymentsAsync(customerId,loanContractId).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createRepayments(customerId,loanContractId,forceReload){
    return dispatch => {
        createRepaymentsAsync(customerId,loanContractId,forceReload).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteRepayment(customerId,loanContractId,id){
      return dispatch => {
            deleteRepaymentAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateRepayment(customerId,loanContractId,id,values){
      return dispatch => {
            updateRepaymentAsync(customerId,loanContractId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getRepaymentDetail(customerId,loanContractId,id){
      return dispatch => {
          getRepaymentDetailAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getRepaymentsAsync(customerId,loanContractId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayments`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: REPAYMENT_LIST,
      repayments: response.body,
    };
  }


  async function createRepaymentsAsync(customerId,loanContractId,forceReload){
    let type = null;
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayments`)
      .type('form')
      .send({forceReload:forceReload})
      .exec().then(function(res){
        type = REPAYMENT_CREATE;
        return res;
      },function(err){
          type = REPAYMENT_ERROR;
          return err.response;
      });

      return {
        type: type,
        repayments: response.body,
      };

  }



  async function deleteRepaymentAsync(customerId,loanContractId,id){
    let response = await request
      .del(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayments/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: REPAYMENT_DELETE,
        repayments: response.body,
        id:id
      };

  }

  async function updateRepaymentAsync(customerId,loanContractId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayments/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = REPAYMENT_UPDATE;
        return res;
      },function(err){
        type = REPAYMENT_ERROR;
        return err.response;
      });

      return {
        type: type,
        repayments: response.body,
        id:id
      };

  }



    async function getRepaymentDetailAsync(customerId,loanContractId,id){
      let response = await request
        .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/repayments/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: REPAYMENT_DETAIL,
          repayment: response.body,
          id:id
        };

    }
