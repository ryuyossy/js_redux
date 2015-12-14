import request from 'superagent';
import { LOAN_CONTRACT_COLLATERAL_LIST, LOAN_CONTRACT_COLLATERAL_CREATE, LOAN_CONTRACT_COLLATERAL_DELETE, LOAN_CONTRACT_COLLATERAL_ERROR,LOAN_CONTRACT_COLLATERAL_UPDATE,LOAN_CONTRACT_COLLATERAL_DETAIL,LOAN_CONTRACT_COLLATERAL_CLEAR,LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD } from '../constants/ActionTypes';

  export function getLoanContractCollaterals(customerId,loanContractId) {
    return dispatch => {
        getLoanContractCollateralsAsync(customerId,loanContractId).then(result =>{
          return dispatch(result);
        });
    };
  }



  export function createLoanContractCollateral(customerId,loanContractId,values){
    return dispatch => {
        createLoanContractCollateralAsync(customerId,loanContractId,values).then(result =>{
          return dispatch(result);
        });
    };
  }


    export function deleteLoanContractCollateral(customerId,loanContractId,id){
      return dispatch => {
            deleteLoanContractCollateralAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function updateLoanContractCollateral(customerId,loanContractId,id,values){
      return dispatch => {
            updateLoanContractCollateralAsync(customerId,loanContractId,id,values).then(result =>{
            return dispatch(result);
          });
      };
    }




    export function getLoanContractCollateralDetail(customerId,loanContractId,id){
      return dispatch => {
          getLoanContractCollateralDetailAsync(customerId,loanContractId,id).then(result =>{
            return dispatch(result);
          });
      };
    }


    export function uploadIdPicture(customerId, loanContractId, id, file) {
      return dispatch => {
          uploadIdPictureAsync(customerId, loanContractId, id, file).then(result =>{
            return dispatch(result);
          });
      };
    }


  async function uploadIdPictureAsync(customerId, loanContractId, id, file){
    let type = LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD;
    var formData = new FormData();
    formData.append('file', file);
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals/${id}/idPicture/upload`)
      .send(formData)
      .exec().then(function(res){
        type = LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD;
        return res;
      },function(err){
          type = LOAN_CONTRACT_COLLATERAL_ERROR;
          return err.response;
      });

      return {
      type: LOAN_CONTRACT_COLLATERAL_ID_PICTURE_UPLOAD,
      loanContractCollaterals: response.body,
    };

  }

  async function getLoanContractCollateralsAsync(customerId,loanContractId) {
    let response = await request
      .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals`)
      .query({
        per_page: 50,
      })
      .exec();

    return {
      type: LOAN_CONTRACT_COLLATERAL_LIST,
      loanContractCollaterals: response.body,
    };
  }


  async function createLoanContractCollateralAsync(customerId,loanContractId,values){

    let type = null;
    let response = await request
      .post(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals`)
      .type('form')
      .send({...values})
      .exec().then(function(res){
        type = LOAN_CONTRACT_COLLATERAL_CREATE;
        return res;
      },function(err){
          type = LOAN_CONTRACT_COLLATERAL_ERROR;
          return err.response;
      });

      return {
        type: type,
        loanContractCollaterals: response.body,
      };

  }



  async function deleteLoanContractCollateralAsync(customerId,loanContractId,id){
    let response = await request
      .del(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals/${id}`)
      .exec().then(function(res){
        return res;
      },function(err){
          return err.response;
      });

      return {
        type: LOAN_CONTRACT_COLLATERAL_DELETE,
        loanContractCollaterals: response.body,
        id:id
      };

  }

  async function updateLoanContractCollateralAsync(customerId,loanContractId,id,values){
    let type = null;
    let response = await request
      .put(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals/${id}`)
      .type('form')
      .send({
        ...values
      })
      .exec().then(function(res){
        type = LOAN_CONTRACT_COLLATERAL_UPDATE;
        return res;
      },function(err){
        type = LOAN_CONTRACT_COLLATERAL_ERROR;
        return err.response;
      });

      return {
        type: type,
        loanContractCollaterals: response.body,
        id:id
      };

  }



    async function getLoanContractCollateralDetailAsync(customerId,loanContractId,id){
      let response = await request
        .get(`/api/v1/customers/${customerId}/loanContracts/${loanContractId}/collaterals/${id}`)
        .exec().then(function(res){
          return res;
        },function(err){
            return err.response;
        });

        return {
          type: LOAN_CONTRACT_COLLATERAL_DETAIL,
          loanContractCollateral: response.body,
          id:id
        };

    }
