import request from 'superagent';
import { LOAN_CONTRACT_LIST, LOAN_CONTRACT_CREATE, LOAN_CONTRACT_DELETE, LOAN_CONTRACT_ERROR,LOAN_CONTRACT_UPDATE,LOAN_CONTRACT_DETAIL,LOAN_CONTRACT_CLEAR } from '../constants/ActionTypes';

  export function getLoanContracts(customerId) {
    return dispatch => {
        getLoanContractsAsync(customerId).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createLoanContract(customerId,values){
    return dispatch => {
        createLoanContractAsync(customerId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteLoanContract(id,customerId){
      return dispatch => {
            deleteLoanContractAsync(id,customerId).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateLoanContract(id,customerId,values){
      return dispatch => {
            updateLoanContractAsync(id,customerId,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getLoanContractDetail(id,customerId){
      return dispatch => {
          getLoanContractDetailAsync(id,customerId).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function getLoanContractsAsync(customerId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/loanContracts`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: LOAN_CONTRACT_LIST,
      loanContracts: response.body,
    };
  }


  async function createLoanContractAsync(customerId,values){
    let type = null;
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts`)
      .type('form')
      .send({
        ...values
      }
      )
      .exec().then(function(res){
        type = LOAN_CONTRACT_CREATE;
        return res;
      },function(err){
          type = LOAN_CONTRACT_ERROR;
          return err.response;
      });

      return {
        type: type,
        loanContracts: response.body,
      };

  }



  async function deleteLoanContractAsync(id,customerId){
    let response = await request
      .del(`/api/v1/customers/${customerId}/loanContracts/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: LOAN_CONTRACT_DELETE,
        loanContracts: response.body,
        id:id
      };

  }

  async function updateLoanContractAsync(id,customerId,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = LOAN_CONTRACT_UPDATE;
        return res;
      },function(err){
        type = LOAN_CONTRACT_ERROR;
        return err.response;
      });

      return {
        type: type,
        loanContracts: response.body,
        id:id
      };

  }



    async function getLoanContractDetailAsync(id,customerId){
      let response = await request
        .get(`/api/v1/customers/${customerId}/loanContracts/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: LOAN_CONTRACT_DETAIL,
          loanContract: response.body,
          id:id
        };

    }
